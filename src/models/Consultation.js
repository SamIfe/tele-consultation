const mongoose = require('mongoose');
const { CONSULTATION_STATUS } = require('../utils/constants');

const consultationSchema = new mongoose.Schema({
  consultationId: { type: String, unique: true, required: true },
  appointmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true 
  },
  startDateTime: { type: Date, required: true },
  endDateTime: Date,
  notes: String,
  prescription: String,
  status: { 
    type: String, 
    enum: Object.values(CONSULTATION_STATUS), 
    default: CONSULTATION_STATUS.SCHEDULED 
  },
  roomUrl: String
});

module.exports = mongoose.model('Consultation', consultationSchema);