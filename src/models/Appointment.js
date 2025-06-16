const mongoose = require('mongoose');
const { APPOINTMENT_STATUS } = require('../utils/constants');

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, unique: true, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDateTime: { type: Date, required: true },
  reason: String,
  status: { 
    type: String, 
    enum: Object.values(APPOINTMENT_STATUS), 
    default: APPOINTMENT_STATUS.PENDING 
  },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);