const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/config');

class AuthService {
  static async register(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      return this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  static generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username
    };

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: '24h'
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = AuthService; 