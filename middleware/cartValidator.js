const { check, validationResult } = require('express-validator');

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

exports.validateAddItem = validate([
  check('menuItemId', 'Valid menuItemId is required').isMongoId(),
  check('quantity', 'Quantity must be an integer between 1 and 20').isInt({ min: 1, max: 20 })
]);

exports.validateUpdateItem = validate([
  check('menuItemId', 'Valid menuItemId is required').isMongoId(),
  check('quantity', 'Quantity must be an integer between 1 and 20').isInt({ min: 1, max: 20 })
]);

exports.validateRemoveItem = validate([
  check('menuItemId', 'Valid menuItemId is required').isMongoId()
]);
