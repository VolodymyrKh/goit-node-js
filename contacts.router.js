const express = require("express");
const {
  getContacts,
  getContactById,
  createContact,
  deleteContactById,
  updateContactById
} = require("./contacts.controller");

const contactRouter = express.Router();
contactRouter.get("/", getContacts);
contactRouter.get("/:id", getContactById);
contactRouter.post("/", createContact);
contactRouter.delete("/:id", deleteContactById);
contactRouter.patch("/:id", updateContactById);


exports.contactRouter = contactRouter;
