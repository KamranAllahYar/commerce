const Joi = require('joi');
const commonValidation = require('../commonValidation');
const rules = {
  create: Joi.object({
    product_id: Joi.number().required(),
    sku: Joi.string().required(),
    mrp: Joi.number().required().greater(0),
    price: Joi.number().required().greater(0),
    active: Joi.boolean(),
  }),
  update: Joi.object({
    product_id: Joi.number(),
    sku: Joi.string(),
    mrp: Joi.number().greater(0),
    price: Joi.number().greater(0),
    active: Joi.boolean(),
  }),
};
module.exports = commonValidation(rules);
