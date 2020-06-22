const Joi = require("@hapi/joi");

const contactValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid("free", "pro", "premium"),
});

const updateContactValidation = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
  subscription: Joi.string().valid("free", "pro", "premium"),
});

exports.contactValidationMiddleware = async (req, res, next) => {
  const { error } = await contactValidation.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.message
    });
    return;
  }
  next();
};

exports.updateUserValidationMiddleware = async (req, res, next) => {
  const { error } = await updateContactValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};
