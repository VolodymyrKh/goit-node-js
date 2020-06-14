const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: (value) => value.includes("@"),
    },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: String
});

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  getContacts(query) {
    return this.contact.find(query);
  }

  createContact(contactToAdd) {
    return this.contact.create(contactToAdd);
  }

  getContactById(id){
     return this.contact.findById(id)
  }

  deleteContactById(id){
     return this.contact.findByIdAndDelete(id)    
  } 

  updateContactById(id, itemsToUpdate) {
    return this.contact.findByIdAndUpdate(id, {$set: itemsToUpdate}, {new: true})
  }
}



module.exports = new Contact();
