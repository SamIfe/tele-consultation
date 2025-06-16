const mongoose = require('mongoose');
const { USER_ROLES } = require('../utils/constants');

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
  addresses: [{
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'Nigeria' }
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);