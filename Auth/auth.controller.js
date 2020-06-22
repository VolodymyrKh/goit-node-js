const Contact = require("../Contacts/contact.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../Services/create.token");

exports.registrationController = async (req, res) => {
  try {
    const emailExists = await Contact.existContactEmail({
      email: req.body.email,
    });
    if (emailExists) {
      res.status(409).json({ message: "Email in use" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const contactToAdd = {
        ...req.body,
        password: hashedPassword,
        role: "USER",
      };
      const conact = await Contact.createContact(contactToAdd);
      const { email, subscription } = conact;
      res.status(201).json({ user: { email, subscription } });
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
