const Joi = require("@hapi/joi");

const contactLoginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

exports.contactLoginValidationMiddleware = async (req, res, next) => {
  const { error } = await contactLoginValidation.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }
  next();
};
