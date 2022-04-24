const { Joi } = require('express-validation');
const productValidations = {
  create: {
    body: Joi.object({
      parent: Joi.number().required(),
      name: Joi.string().required(),
      slug: Joi.string(),
      meta_title: Joi.string(),
      meta_description: Joi.string(),
      active: Joi.boolean(),
    }),
  },
  update: {
    body: Joi.object({
      parent: Joi.number(),
      name: Joi.string(),
      slug: Joi.string(),
      meta_title: Joi.string(),
      meta_description: Joi.string(),
      active: Joi.boolean(),
    }),
  },
};
module.exports = productValidations;
