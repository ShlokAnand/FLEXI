// backend/models/User.js
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password; // in real apps, use bcrypt
    this.createdAt = new Date().toISOString();
  }
}

module.exports = User;
