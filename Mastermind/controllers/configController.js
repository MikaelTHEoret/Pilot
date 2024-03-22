// File: controllers/configController.js

const User = require('../models/User');

const userController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Create a new user instance
      const newUser = new User({ username, password });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Add other controller methods as needed

};

module.exports = userController;
