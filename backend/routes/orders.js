// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const { saveOrder, getAllOrders } = require('../controllers/orderController');

// POST /api/orders  -> client places an order
router.post('/', async (req, res) => {
  try {
    const order = req.body;
    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
      return res.status(400).json({ error: 'Invalid order payload' });
    }
    const saved = await saveOrder(order);
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders -> admin only
router.get('/', (req, res) => {
  const token = req.header('x-admin-token');
  if (!token || token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const orders = getAllOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
