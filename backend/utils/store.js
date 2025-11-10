// backend/utils/store.js
const fs = require('fs');
const path = require('path');

function resolveFile(filename) {
  return path.join(__dirname, '..', 'data', filename);
}

function readJson(filename) {
  const file = resolveFile(filename);
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '[]', 'utf-8');
      return [];
    }
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading file', filename, err);
    return [];
  }
}

function writeJson(filename, data) {
  const file = resolveFile(filename);
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing file', filename, err);
    return false;
  }
}

module.exports = { readJson, writeJson };
