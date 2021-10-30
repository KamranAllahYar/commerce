const Joi = require('joi');
const commonValidation = require('../commonValidation');
const rules = {
  create: Joi.object({
    name: Joi.string().required(),
  }),
  update: Joi.object({
    name: Joi.string().required(),
  }),
};
module.exports = commonValidation(rules);