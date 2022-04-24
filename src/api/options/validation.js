const { Joi } = require('express-validation');
const productValidations = {
  create: {
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
  update: {
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
};
module.exports = productValidations;
