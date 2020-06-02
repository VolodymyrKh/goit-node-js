const fs = require("fs");
const path = require("path");
const util = require("util");
const { Contact } = require("./db/createContact");
const { v4: uuidv4 } = require("uuid");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const contactsPath = path.join(__dirname, "./db/contacts.json");


async function listContacts() {
  const contacts = await readFile(contactsPath, "utf8");
  const parcedContacts = JSON.parse(contacts);
  return parcedContacts;
}


async function getById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  filteredContacts = contacts.filter((contact) => contact.id !== contactId);
  return await writeFile(contactsPath, JSON.stringify(filteredContacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = uuidv4();
  const newContact = new Contact(id, name, email, phone);
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getById,  
  removeContact,
  addContact,
};
