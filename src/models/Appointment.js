const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, unique: true, required: true },
  appointmentDateTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  symptoms: String,
  appointmentType: { type: String, enum: ['consultation', 'follow-up'], default: 'consultation' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
