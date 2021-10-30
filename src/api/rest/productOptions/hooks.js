const Controller = require('./controller');
const Model = require('./model');
const ProductModel = require('../products/model');
const OptionModel = require('../options/model');
const hooks = require('../commonHooks');
module.exports = hooks(Controller, Model, ProductModel, OptionModel);