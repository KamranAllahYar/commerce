const Joi = require('joi');
const commonValidation = require('../commonValidation');
const rules = {
  create: Joi.object({
    product_id: Joi.number().required(),
    option_id: Joi.number().required(),
  }),
  update: Joi.object({
    product_id: Joi.number().required(),
    option_id: Joi.number().required(),
  }),
};
module.exports = commonValidation(rules);
