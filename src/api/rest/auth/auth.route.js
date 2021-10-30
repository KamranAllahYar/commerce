const express = require('express');
const AuthController = require('./auth.controller');
const { validate } = require('express-validation');
const { register, login } = require('./auth.validation');
const router = express.Router();
const authController = new AuthController();
router.post('/register', validate(register, {}, {}), authController.register.bind(authController));
router.post('/login', validate(login, {}, {}), authController.login.bind(authController));

module.exports = router;
