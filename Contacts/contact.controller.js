const Contact = require("./contact.model");

exports.getContactsController = async (req, res) => {
  try {
    const contacts = await Contact.getContacts();
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
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.getContactByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.getContactById(id);
    res.json(contact)
  } catch (error) {
    res.status(500).send("Server error");
  }
};
