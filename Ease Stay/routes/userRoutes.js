const express = require('express');
const router = express.Router();
const User = require('../models/user');

// User registration
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User registered successfully' }); // Send JSON response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json(user); // Send JSON response
    } else {
      res.status(400).json({ message: 'Login failed. Invalid email or password.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
