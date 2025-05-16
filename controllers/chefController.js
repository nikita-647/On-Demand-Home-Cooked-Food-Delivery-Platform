// controllers/chefController.js
const Chef = require('../models/Chef');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign(
    { id, isChef: true },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Chef Authentication
exports.register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      kitchenName, 
      description, 
      cuisineTypes, 
      address, 
      coordinates, 
      profileImage,
      documents 
    } = req.body;

    // Check if chef exists
    let chef = await Chef.findOne({ email });
    if (chef) {
      return res.status(400).json({ msg: 'Chef already exists' });
    }

    // Create new chef
    chef = new Chef({
      name,
      email,
      password,
      phone,
      kitchenName,
      description,
      cuisineTypes,
      address,
      location: {
        type: 'Point',
        coordinates: coordinates || [0, 0] // Default if no coordinates provided
      },
      profileImage,
      documents
    });

    await chef.save();

    // Generate JWT token
    const token = generateToken(chef.id);

    res.status(201).json({
      token,
      chef: {
        id: chef.id,
        name: chef.name,
        email: chef.email,
        kitchenName: chef.kitchenName,
        isVerified: chef.isVerified
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if chef exists
    const chef = await Chef.findOne({ email });
    if (!chef) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await chef.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(chef.id);

    res.json({
      token,
      chef: {
        id: chef.id,
        name: chef.name,
        email: chef.email,
        kitchenName: chef.kitchenName,
        isVerified: chef.isVerified
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCurrent = async (req, res) => {
  try {
    // req.user is set in auth middleware
    const chef = await Chef.findById(req.user.id).select('-password');
    if (!chef) {
      return res.status(404).json({ msg: 'Chef not found' });
    }
    res.json(chef);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
