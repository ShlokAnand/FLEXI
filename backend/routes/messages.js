// backend/routes/messages.js
const express = require('express');
const router = express.Router();
const { saveMessage, getAllMessages } = require('../controllers/messageController');

// POST /api/messages  -> client contact form posts here
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

    const saved = await saveMessage({ name, email, message, date: new Date().toISOString() });
    res.status(201).json({ success: true, message: 'Message saved', data: saved });
  } catch (err) {
    console.error('POST /api/messages error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/messages -> protected by simple token header (admin)
router.get('/', (req, res) => {
  const token = req.header('x-admin-token');
  if (!token || token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const messages = getAllMessages();
    res.json({ success: true, data: messages });
  } catch (err) {
    console.error('GET /api/messages error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
