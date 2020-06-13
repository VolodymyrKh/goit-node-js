const { userValidation, updateUserValidation } = require("./contact.validator");
const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts.model");

// async function getContacts(req, res) {
//   const contacts = await listContacts();
//   res.json(contacts);
// }

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

async function deleteContactById(req, res) {
  const contactToRemove = await removeContact(req.params.id);
  contactToRemove
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Contact not found" });
}

async function updateContactById(req, res) {
  const { error } = updateUserValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else if (!Object.keys(req.body).length) {
    res.status(404).json({ message: "missing fields" });
  } else {
    const updatedContact = await updateContact(req.params.id, req.body);
    updatedContact
      ? res.status(201).json(updatedContact)
      : res.status(404).json({ message: "Contact not found" });
  }
}

module.exports = {
  // getContacts,
  getContactById,
  createContact,
  deleteContactById,
  updateContactById,
};
