// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');

function checkAdminToken(req, res) {
  const token = req.header('x-admin-token');
  if (!token || token !== process.env.ADMIN_TOKEN) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const user = registerUser({ name, email, password });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = loginUser({ email, password });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/auth/users (admin only)
router.get('/users', (req, res) => {
  if (!checkAdminToken(req, res)) return;
  try {
    const users = getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
