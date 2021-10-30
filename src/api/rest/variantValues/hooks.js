const Controller = require('./controller');
const Model = require('./model');
const hooks = require('../commonHooks');
module.exports = hooks(Controller, Model);