
const mongoose = require('mongoose');
const User = require('./User');

const Patient = User.discriminator('Patient', new mongoose.Schema({
  bloodGroup: String,
  height: Number,
  weight: Number,
  allergies: [String],
  medicalHistory: String,
  medications: [String],
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  }
}));

module.exports = Patient;
