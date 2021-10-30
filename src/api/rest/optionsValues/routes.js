const express = require('express');
const AUTH = require('../../../middlewares/auth');
const { validate } = require('express-validation');
const { create, update } = require('./validation');
const hooks = require('./hooks');

// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', AUTH, ...hooks.find);
router.post('/', AUTH, create, ...hooks.create);
router.get('/:id', AUTH, ...hooks.get);
router.put('/:id', AUTH,update, ...hooks.update);
router.delete('/:id', AUTH, ...hooks.delete);

module.exports = router;
