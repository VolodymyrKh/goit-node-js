const Joi = require('@hapi/joi');

exports.userValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

exports.updateUserValidation = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})