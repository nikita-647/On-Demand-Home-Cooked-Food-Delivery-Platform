const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');
const {
  validateAddItem,
  validateUpdateItem,
  validateRemoveItem
} = require('../middleware/cartValidator');

// Add item to cart
router.post('/add', auth, validateAddItem, cartController.addItem);

// Get current user cart
router.get('/', auth, cartController.getCart);

// Update item quantity
router.put('/update', auth, validateUpdateItem, cartController.updateItem);

// Remove item from cart
router.delete('/remove', auth, validateRemoveItem, cartController.removeItem);

// Clear entire cart
router.delete('/clear', auth, cartController.clearCart);

module.exports = router;
