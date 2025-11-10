// backend/controllers/messageController.js
const { readJson, writeJson } = require('../utils/store');

async function saveMessage(msg) {
  // read existing messages from data/messages.json
  const messages = readJson('messages.json');
  const newMsg = {
    id: Date.now(),
    name: msg.name,
    email: msg.email,
    message: msg.message,
    date: msg.date || new Date().toISOString(),
  };
  messages.push(newMsg);
  writeJson('messages.json', messages);
  return newMsg;
}

function getAllMessages() {
  return readJson('messages.json');
}

module.exports = { saveMessage, getAllMessages };
