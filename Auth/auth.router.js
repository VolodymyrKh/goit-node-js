const { Router } = require("express");
const {
  contactValidationMiddleware,
} = require("../Contacts/contact.validator");
const { contactLoginValidationMiddleware } = require("./auth.validator");
const { tokenMiddleware } = require("../Services/token.middleware");
const {
  registrationController,
  loginController,
  logoutController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post(
  "/register",
  contactValidationMiddleware,
  registrationController
);
authRouter.post("/login", contactLoginValidationMiddleware, loginController);
authRouter.post("/logout", tokenMiddleware, logoutController);

exports.authRouter = authRouter;
