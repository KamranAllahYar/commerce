const { Router } = require('express');
const Controller = require('./controller');
const { validate } = require('express-validation');
const { register, login } = require('./validation');
const AUTH = require('../../middlewares/auth');
const router = Router();
const ctrl = new Controller();
router.post('/register', validate(register, {}, {}), ctrl.register.bind(ctrl));
router.post('/login', validate(login, {}, {}), ctrl.login.bind(ctrl));
router.get('/logout', AUTH, ctrl.logout.bind(ctrl));

module.exports = router;
