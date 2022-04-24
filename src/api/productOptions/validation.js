const { Joi } = require('express-validation');
const productValidations = {
  create: {
    body: Joi.object({
      product_id: Joi.number().required(),
      option_id: Joi.number().required(),
    }),
  },
  update: {
    body: Joi.object({
      product_id: Joi.number().required(),
      option_id: Joi.number().required(),
    }),
  },
};
module.exports = productValidations;

