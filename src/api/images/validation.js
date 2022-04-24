const { Joi } = require('express-validation');
const productValidations = {
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      slug: Joi.string(),
      sku: Joi.string().required(),
      active: Joi.boolean(),
      type: Joi.number(),
    }),
  },
  update: {
    body: Joi.object({
      name: Joi.string(),
      slug: Joi.string(),
      sku: Joi.string(),
      active: Joi.boolean(),
      type: Joi.number(),
    }),
  },
};
module.exports = productValidations;
