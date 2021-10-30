const Joi = require('joi');
const commonValidation = require('../commonValidation');
const rules = {
  create: Joi.object({
    name: Joi.string().required(),
    slug: Joi.string(),
    sku: Joi.string().required(),
    active: Joi.boolean(),
    type: Joi.number(),
  }),
  update: Joi.object({
    name: Joi.string(),
    slug: Joi.string(),
    sku: Joi.string(),
    active: Joi.boolean(),
    type: Joi.number(),
  }),
};
module.exports = commonValidation(rules);
