const { Router } = require("express");
const {
  getContactsController,
  createContactController,
  getContactByIdController
} = require("./contact.controller");
const { userValidationMiddleware } = require("./contact.validator");

const contactRouter = Router();

contactRouter.get("/", getContactsController);
contactRouter.post("/", userValidationMiddleware, createContactController);
contactRouter.get("/:id", getContactByIdController);

exports.contactRouter = contactRouter;
