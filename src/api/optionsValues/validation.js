const { Joi } = require('express-validation');
const productValidations = {
  create: {
    body: Joi.object({
      option_id: Joi.number().required(),
      value: Joi.string().required(),
    }),
  },
  update: {
    body: Joi.object({
      option_id: Joi.number().required(),
      value: Joi.string().required(),
    }),
  },
};
module.exports = productValidations;
