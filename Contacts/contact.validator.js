const Joi = require("@hapi/joi");

const userValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string(),
});

const updateUserValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  subscription: Joi.string(),
  password: Joi.string(),
  token: Joi.string(),
});

exports.userValidationMiddleware = (req, res, next) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    res
      .status(400)
      .json({
        message: `missing required '${error.details[0].path[0]}' field`,
      });
    return;
  }
  next();
};

exports.updateUserValidationMiddleware = (req, res, next) => {
  const { error } = updateUserValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};