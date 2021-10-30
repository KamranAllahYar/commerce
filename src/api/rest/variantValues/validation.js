const { Joi } = require('express-validation');
const productValidations = {
  create: {
    body: Joi.object({
      option_id: Joi.number().required(),
      variant_id: Joi.number().required(),
      stock: Joi.number().default(0),
      mrp: Joi.number(),
      price: Joi.number(),
      active: Joi.boolean(),
    }),
  },
  update: {
    body: Joi.object({
      option_id: Joi.number().required(),
      variant_id: Joi.number().required(),
      stock: Joi.number().default(0),
      mrp: Joi.number(),
      price: Joi.number(),
      active: Joi.boolean(),
    }),
  },
};
module.exports = productValidations;
