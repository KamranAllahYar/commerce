const express = require('express');
const UserController = require('./controller');
const AUTH = require('../../../middlewares/auth');
const router = express.Router();
const userController = new UserController();
/* GET userControllers listing. */
router.get('/', AUTH, userController.index.bind(userController));
router.get('/:id', userController.get.bind(userController));
module.exports = router;
