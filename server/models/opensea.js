const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
  },
  collections: {
    type: [],
    required: true,
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;