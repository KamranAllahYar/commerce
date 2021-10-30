const Joi = require('joi');
const commonValidation = require('../commonValidation');
const rules = {
  create: Joi.object({
    option_id: Joi.number().required(),
    value: Joi.string().required(),
  }),
  update: Joi.object({
    option_id: Joi.number().required(),
    value: Joi.string().required(),
  }),
};
module.exports = commonValidation(rules);