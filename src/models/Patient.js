
const mongoose = require('mongoose');
const User = require('./User');

const patientSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  medicalHistory: String,
  allergies: [String],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  }
});

module.exports = User.discriminator('patient', patientSchema);
