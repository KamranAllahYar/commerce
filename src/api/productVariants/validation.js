const { Joi } = require('express-validation');
const productValidations = {
  create: {
    body: Joi.object({
      product_id: Joi.number().required(),
      sku: Joi.string().required(),
      mrp: Joi.number().required().greater(0),
      price: Joi.number().required().greater(0),
      active: Joi.boolean(),
    }),
  },
  update: {
    body: Joi.object({
      product_id: Joi.number(),
      sku: Joi.string(),
      mrp: Joi.number().greater(0),
      price: Joi.number().greater(0),
      active: Joi.boolean(),
    }),
  },
};
module.exports = productValidations;

