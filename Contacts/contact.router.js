const { Router } = require("express");
const {
  getContactsController,
  createContactController,
  getContactByIdController,
  deleteContactByIdController,
  updateContactByIdController
} = require("./contact.controller");

const { userValidationMiddleware, updateUserValidationMiddleware } = require("./contact.validator");

const contactRouter = Router();

contactRouter.get("/", getContactsController);
contactRouter.post("/", userValidationMiddleware, createContactController);
contactRouter.get("/:id", getContactByIdController);
contactRouter.delete("/:id", deleteContactByIdController);
contactRouter.patch("/:id", updateUserValidationMiddleware, updateContactByIdController);

exports.contactRouter = contactRouter;
