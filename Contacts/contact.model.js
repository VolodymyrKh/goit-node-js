const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const contactSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: (value) => value.includes("@"),
    unique: true,
  },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  avatarURL: String,
  role: String,
  token: { type: String, default: "" },
  verificationToken: String,
});

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  existContactEmail(query) {
    return this.contact.exists(query);
  }

  getContactByQuery(query) {
    return this.contact.findOne(query);
  }

  getContacts(query) {
    return this.contact.find(query, { password: false, token: false }).limit(10);
  }

  createContact(contactToAdd) {
    return this.contact.create(contactToAdd);
  }

  getContactById(id) {
    return this.contact.findById(id, { password: false });
  }

  deleteContactById(id) {
    return this.contact.findByIdAndDelete(id);
  }

  updateContactById(id, itemsToUpdate) {
    return this.contact.findByIdAndUpdate(
      id,
      { $set: itemsToUpdate },
      { new: true }
    );
  }
}

module.exports = new Contact();
