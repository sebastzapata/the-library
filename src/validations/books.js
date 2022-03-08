const Joi = require("joi");

const bookValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  pages: Joi.number().min(1).required(),
  status: Joi.string().valid("LENT", "AVAILABLE", "UNAVAILABLE").required(),
});

module.exports = bookValidationSchema;
