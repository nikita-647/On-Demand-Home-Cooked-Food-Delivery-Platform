const Cart = require('../models/Cart');

exports.addItem = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart for user
      cart = new Cart({
        user: userId,
        items: [{ menuItemId, quantity }]
      });
    } else {
      // Check if item exists in cart
      const itemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);

      if (itemIndex > -1) {
        // Item exists, update quantity
        cart.items[itemIndex].quantity += quantity;
        if (cart.items[itemIndex].quantity > 20) {
          cart.items[itemIndex].quantity = 20; // cap at max 20
        }
      } else {
        // Add new item
        cart.items.push({ menuItemId, quantity });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.menuItemId');
    if (!cart) {
      return res.status(200).json({ items: [] }); // empty cart
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateItem = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);
    if (itemIndex === -1) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.updatedAt = Date.now();

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.removeItem = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.menuItemId.toString() !== menuItemId);
    cart.updatedAt = Date.now();

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(200).json({ msg: 'Cart is already empty' });
    }

    cart.items = [];
    cart.updatedAt = Date.now();

    await cart.save();

    res.status(200).json({ msg: 'Cart cleared' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
