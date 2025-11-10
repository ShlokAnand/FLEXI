// backend/controllers/orderController.js
const { readJson, writeJson } = require('../utils/store');
const path = require('path');

async function saveOrder(order) {
  const orders = readJson('orders.json');

  const newOrder = {
    id: Date.now(),
    items: order.items,
    total: order.total || 0,
    customer: order.customer || null,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeJson('orders.json', orders);
  return newOrder;
}

function getAllOrders() {
  return readJson('orders.json');
}

module.exports = { saveOrder, getAllOrders };
