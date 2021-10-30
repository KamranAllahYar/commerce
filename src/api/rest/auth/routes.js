const express = require('express');
const AuthController = require('./controller');
const { validate } = require('express-validation');
const { register, login } = require('./validation');
const AUTH = require('../../../middlewares/auth');
const router = express.Router();
const authController = new AuthController();
router.post('/register', validate(register, {}, {}), authController.register.bind(authController));
router.post('/login', validate(login, {}, {}), authController.login.bind(authController));
router.get('/logout', AUTH, authController.logout.bind(authController));

module.exports = router;
