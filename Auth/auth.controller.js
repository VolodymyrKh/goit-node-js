const Contact = require("../Contacts/contact.model");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { createToken } = require("../Services/create.token");
const { createAvatar } = require("../Services/generate.avatar");
const {
  minifyRegistrationAvatar,
} = require("../Services/minifyRegistrationAvatar");
const { sendVerivicationMail } = require("../Services/mail.verification");

exports.registrationController = async (req, res) => {
  try {
    const emailExists = await Contact.existContactEmail({
      email: req.body.email,
    });
    if (emailExists) {
      res.status(409).json({ message: "Email in use" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await createAvatar(req.body.email); // Create avatar + write to Tmp
      const avatarName = await minifyRegistrationAvatar(); // minify avatar + put from Tmp to Public/Images + remove from Tmp

      const contactToAdd = {
        ...req.body,
        password: hashedPassword,
        role: "USER",
        avatarURL: `http://localhost:3000/images/${avatarName}`,
        verificationToken: uuidv4(),
      };

      const {
        email,
        subscription,
        avatarURL,
        verificationToken,
      } = await Contact.createContact(contactToAdd);

      await sendVerivicationMail(verificationToken, email);

      res.status(201).json({ user: { email, subscription, avatarURL } });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error);
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const contact = await Contact.getContactByQuery({ email });
    if (!contact) {
      res.status(401).send("Email or password is wrong");
      return;
    }
    const isPassworValid = await bcrypt.compare(password, contact.password);
    if (!isPassworValid) {
      res.status(401).send("Email or password is wrong");
      return;
    }
    const { verificationToken } = contact;
    if (verificationToken) {
      res.status(403).send("Email is not verified");
      return;
    }
    const contactToken = await createToken(contact._id);
    await Contact.updateContactById(contact._id, { token: contactToken });

    const loggedInContact = await Contact.getContactById(contact._id);
    const { subscription, token } = loggedInContact;

    res.status(200).json({ token, user: { email, subscription } });
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error);
  }
};

exports.logoutController = async (req, res) => {
  try {
    const { _id } = req.contact;
    await Contact.updateContactById(_id, { token: null });
    res.status(204).send();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
    console.log(error);
  }
};

exports.verificationController = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  if (!verificationToken) {
    res.status(401).send("Token was not provided");
    return;
  }
  try {
    const contact = await Contact.getContactByQuery({ verificationToken });
    if (!contact) {
      res.status(404).send("Contact not found");
      return;
    }
    await Contact.updateContactById(contact._id, { verificationToken: null });
    res.status(200).send("Your account is verified");
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error);
  }
};
