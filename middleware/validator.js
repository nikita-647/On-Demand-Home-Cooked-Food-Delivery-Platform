// middleware/validator.js
const { check, validationResult } = require('express-validator');

// Middleware to validate data
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ errors: errors.array() });
  };
};

// User registration validation
exports.validateUserRegistration = validate([
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('phone', 'Phone number is required').notEmpty()
]);

// Chef registration validation
exports.validateChefRegistration = validate([
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('phone', 'Phone number is required').notEmpty(),
  check('kitchenName', 'Kitchen name is required').notEmpty(),
  check('address', 'Address is required').notEmpty()
]);

// Login validation
exports.validateLogin = validate([
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
]);