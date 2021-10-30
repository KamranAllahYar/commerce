const { Joi } = require('express-validation');
const authValidations = {
  register: {
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
      username: Joi.string(),
    }).pattern(/./, Joi.string()),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
      rememberMe: Joi.boolean(),
      username: Joi.string(),
    }).pattern(/./, Joi.string()),
  },
};
module.exports = authValidations;
