
const mongoose = require('mongoose');
const User = require('./User');

const Doctor = User.discriminator('Doctor', new mongoose.Schema({
  specialization: { type: String, required: true },
  licenseNumber: { type: String, unique: true, required: true },
  qualifications: [String],
  experience: Number,
  consultationFee: { type: Number, required: true },
  availability: [String],
  timeSlots: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  isVerified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  bio: String,
  profileImage: String
}));

module.exports = Doctor;
