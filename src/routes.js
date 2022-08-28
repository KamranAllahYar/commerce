const base = '/api';
const { ValidationError } = require('express-validation');
module.exports = function( app ) {
  app.use(`${base}/users`, require('../src/api/users/routes'));
  app.use(`${base}/auth`, require('./api/auth/routes'));
  app.use(`${base}/products/options`, require('../src/api/productOptions/routes'));
  app.use(`${base}/products/variants`, require('../src/api/productVariants/routes'));
  app.use(`${base}/products/variants`, require('../src/api/productVariants/routes'));
  app.use(`${base}/products/categories`, require('../src/api/productCategories/routes'));
  app.use(`${base}/variants/values`, require('../src/api/variantValues/routes'));
  app.use(`${base}/products`, require('../src/api/products/routes'));
  app.use(`${base}/options/values`, require('../src/api/optionsValues/routes'));
  app.use(`${base}/options`, require('../src/api/options/routes'));
  app.use(`${base}/categories`, require('../src/api/categories/routes'));
  app.use(`${base}/images`, require('../src/api/images/routes'));
  app.use(`${base}/media`, require('../src/api/media/routes'));
  app.use(function( err, req, res, next ) {
    if ( err instanceof ValidationError ) {
      return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
  });
};
