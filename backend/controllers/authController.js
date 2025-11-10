// backend/controllers/authController.js
const { readJson, writeJson } = require('../utils/store');
const User = require('../models/User');

const FILE = 'users.json';

// Register user
function registerUser({ name, email, password }) {
  const users = readJson(FILE);

  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    throw new Error('User already exists');
  }

  const newUser = new User(name, email, password);
  users.push(newUser);
  writeJson(FILE, users);
  return newUser;
}

// Login user
function loginUser({ email, password }) {
  const users = readJson(FILE);

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  return { name: user.name, email: user.email, message: 'Login successful' };
}

// Get all users (admin)
function getAllUsers() {
  return readJson(FILE);
}

module.exports = { registerUser, loginUser, getAllUsers };
