const base = '/api';
const version = '/v1/';
const { ValidationError } = require('express-validation');
module.exports = function( app ) {
  app.use(base + version + 'users', require('../src/api/users/routes'));
  app.use(base + version + 'auth', require('./api/auth/routes'));
  app.use(base + version + 'products/options', require('../src/api/productOptions/routes'));
  app.use(base + version + 'products/variants', require('../src/api/productVariants/routes'));
  app.use(base + version + 'products/variants', require('../src/api/productVariants/routes'));
  app.use(base + version + 'products/categories', require('../src/api/productCategories/routes'));
  app.use(base + version + 'variants/values', require('../src/api/variantValues/routes'));
  app.use(base + version + 'products', require('../src/api/products/routes'));
  app.use(base + version + 'options/values', require('../src/api/optionsValues/routes'));
  app.use(base + version + 'options', require('../src/api/options/routes'));
  app.use(base + version + 'categories', require('../src/api/categories/routes'));
  app.use(base + version + 'images', require('../src/api/images/routes'));
  app.use(base + version + 'media', require('../src/api/media/routes'));
  app.use(function( err, req, res, next ) {
    if ( err instanceof ValidationError ) {
      return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
  });
};
