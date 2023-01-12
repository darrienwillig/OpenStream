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

const mainSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
  },
  collections: {
    type: [],
    required: true,
  },
  sales: {
    type: [],
    required: true,
  }
});

const Main = mongoose.model('main', mainSchema);

module.exports = {User, Main};