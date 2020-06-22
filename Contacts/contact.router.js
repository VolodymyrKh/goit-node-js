const { Router } = require("express");
const { tokenMiddleware } = require("../Services/token.middleware");
const { roleMiddleware } = require("../Services/role.middleware");
const {
  getContactsController,
  createContactController,
  getCurrentContactController,
  getContactByIdController,
  deleteContactByIdController,
  updateContactByIdController,
} = require("./contact.controller");

const {
  contactValidationMiddleware,
  updateUserValidationMiddleware,
} = require("./contact.validator");

const contactRouter = Router();

contactRouter.get(
  "/",
  tokenMiddleware,
  roleMiddleware(["USER", "ADMIN"]),
  getContactsController
);
contactRouter.post(
  "/",
  tokenMiddleware,
  roleMiddleware(["ADMIN"]),
  contactValidationMiddleware,
  createContactController
);
contactRouter.get(
  "/current",
  tokenMiddleware,
  roleMiddleware(["USER", "ADMIN"]),
  getCurrentContactController
);
contactRouter.get(
  "/:id",
  tokenMiddleware,
  roleMiddleware(["USER", "ADMIN"]),
  getContactByIdController
);
contactRouter.delete(
  "/:id",
  tokenMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteContactByIdController
);
contactRouter.patch(
  "/:id",
  tokenMiddleware,
  roleMiddleware(["ADMIN"]),
  updateUserValidationMiddleware,
  updateContactByIdController
);

exports.contactRouter = contactRouter;
