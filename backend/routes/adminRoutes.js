const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { login, getSubmissions, updateStatus } = require('../controllers/adminController');

// Basic auth middleware
const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

router.post('/login', login);
router.get('/submissions', protect, getSubmissions);
router.put('/submissions/:type/:id', protect, updateStatus);

module.exports = router;
