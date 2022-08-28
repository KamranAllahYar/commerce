const { Router } = require('express');
const AUTH = require('../../middlewares/auth');
const { validate } = require('express-validation');
const { create, update } = require('./validation');
const Controller = require('./controller');
const Model = require('./model');
const ctrl = new Controller(Model);
const router = Router();
router.get('/', AUTH, ctrl.find.bind(ctrl));
router.post('/', AUTH, validate(create, { statusCode: 412 }, {}), ctrl.beforeCreate.bind(ctrl),ctrl.create.bind(ctrl));
router.get('/:id', AUTH, ctrl.get.bind(ctrl));
router.put('/:id', AUTH, validate(update, { statusCode: 412 }, {}),ctrl.beforeUpdate.bind(ctrl),ctrl.update.bind(ctrl));
router.delete('/:id', AUTH, ctrl.destroy.bind(ctrl));

module.exports = router;
