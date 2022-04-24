const express = require('express');
const Controller = require('./controller');
const AUTH = require('../../middlewares/auth');
const router = express.Router();
const ctrl = new Controller();
router.get('/', AUTH, ctrl.index.bind(ctrl));
router.get('/:id', ctrl.get.bind(ctrl));
module.exports = router;
