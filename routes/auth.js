// routes/auth.js
const express = require('express');
const router = express.Router();
const { validateUserRegistration, validateChefRegistration, validateLogin } = require('../middleware/validator');
const userController = require('../controllers/userController');
const chefController = require('../controllers/chefController');
const authMiddleware = require('../middleware/authMiddleware');

// User routes
router.post('/users/register', validateUserRegistration, userController.register);
router.post('/users/login', validateLogin, userController.login);
router.get('/users/me', authMiddleware, userController.getCurrent);

// Chef routes
router.post('/chefs/register', validateChefRegistration, chefController.register);
router.post('/chefs/login', validateLogin, chefController.login);
router.get('/chefs/me', authMiddleware, chefController.getCurrent);

module.exports = router;
