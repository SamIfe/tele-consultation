const mongoose = require('mongoose');
const { USER_ROLES } = require('../utils/constants');
const addressSchema = require('./Address');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userRole: { 
    type: String, 
    enum: Object.values(USER_ROLES), 
    required: true 
  },
  phoneNumber: String,
  dateOfBirth: Date,
  addresses: [addressSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, {
  discriminatorKey: 'userType',
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);