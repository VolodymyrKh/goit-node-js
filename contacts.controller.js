const { userValidation } = require("./contact.validator");
const {
  listContacts,
  getById,
  removeContact,
  addContact,
} = require("./contacts.model");

async function getContacts(req, res) {
  const contacts = await listContacts();
  res.json(contacts);
}

async function getContactById(req, res) {
  const contact = await getById(req.params.id);
  contact
    ? res.json(contact)
    : res.status(404).json({ message: "Contact not found" });
}

async function createContact(req, res) {
  const { error } = userValidation.validate(req.body);
  if (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.details[0].path[0]} field` });
  } else {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  }
}

module.exports = {
  getContacts,
  getContactById,
  createContact,
};
