const Controller = require('./controller');
const Model = require('./model');
const hooks = require('../commonHooks');
const OptionModel = require('../options/model');
module.exports = hooks(Controller, Model, OptionModel);