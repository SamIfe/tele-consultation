const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewId: { type: String, unique: true, required: true },
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
