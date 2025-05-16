// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Chef = require('../models/Chef');
require('dotenv').config();

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Additional check to ensure user/chef exists
    const userModel = decoded.isChef ? Chef : User;
    const user = await userModel.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};