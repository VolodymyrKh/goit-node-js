const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: (value) => value.includes("@"),
    unique: true,
  },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
});

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  getContacts() {
    return this.contact.find();
  }

  createContact(contactToAdd) {
    return this.contact.create(contactToAdd);
  }

  getContactById(id){
     return this.contact.findById(id)
  }
}

module.exports = new Contact();
