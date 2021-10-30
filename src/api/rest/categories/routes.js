const express = require('express');
const AUTH = require('../../../middlewares/auth');
const { validate } = require('express-validation');
const { create, update } = require('./validation');
const hooks = require('./hooks');

// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', AUTH, ...hooks.find);
router.post('/', AUTH, validate(create, { statusCode: 412 }, {}), ...hooks.create);
router.get('/:id', AUTH, ...hooks.get);
router.put('/:id', AUTH, validate(update, { statusCode: 412 }, {}), ...hooks.update);
router.delete('/:id', AUTH, ...hooks.delete);

module.exports = router;
