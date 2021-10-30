const express = require('express');
const hooks = require('./hooks');
const AUTH = require('../../../middlewares/auth');
const { validate } = require('express-validation');
const { create, update } = require('./validation');
const router = express.Router();
router.get('/', AUTH, ...hooks.find);
router.post('/', AUTH, create, ...hooks.create);
router.get('/:id', AUTH, ...hooks.get);
router.put('/:id', AUTH, update, ...hooks.update);
router.delete('/:id', AUTH, ...hooks.delete);

module.exports = router;
