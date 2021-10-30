const base = '/api';
const version = '/v1/';
const { ValidationError } = require('express-validation');
module.exports = function( app ) {
  app.use(base + version + 'users', require('../src/api/rest/users/routes'));
  app.use(base + version + 'auth', require('./api/rest/auth/routes'));
  app.use(base + version + 'products/options', require('../src/api/rest/productOptions/routes'));
  app.use(base + version + 'products/variants', require('../src/api/rest/productVariants/routes'));
  app.use(base + version + 'products/variants', require('../src/api/rest/productVariants/routes'));
  app.use(base + version + 'products/categories', require('../src/api/rest/productCategories/routes'));
  app.use(base + version + 'variants/values', require('../src/api/rest/variantValues/routes'));
  app.use(base + version + 'products', require('../src/api/rest/products/routes'));
  app.use(base + version + 'options/values', require('../src/api/rest/optionsValues/routes'));
  app.use(base + version + 'options', require('../src/api/rest/options/routes'));
  app.use(base + version + 'categories', require('../src/api/rest/categories/routes'));
  app.use(base + version + 'images', require('../src/api/rest/images/routes'));
  app.use(base + version + 'media', require('../src/api/rest/media/routes'));
  app.use(function( err, req, res, next ) {
    if ( err instanceof ValidationError ) {
      return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
  });
};
