const Contact = require("./contact.model");

exports.getContactsController = async (req, res) => {
  try {
    const contacts = await Contact.getContacts(req.query);
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.createContactController = async (req, res) => {
  try {
    const createdContact = await Contact.createContact(req.body);
    res.status(201).json(createdContact);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.getCurrentContactController = (req, res) => {
  if (!req.contact) {
    req.status(401).json({ message: "Not authorized" });
    return;
  }
  const { email, subscription } = req.contact;
  res.status(200).json({ email, subscription });
};

exports.getContactByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.getContactById(id);
    res.json(contact);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deleteContactByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const contactToRemove = await Contact.deleteContactById(id);
    contactToRemove
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "Contact not found" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateContactByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.updateContactById(id, req.body);
    res.status(201).json({ message: "contact was updated" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
