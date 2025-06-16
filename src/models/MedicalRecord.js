const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  recordId: { type: String, unique: true, required: true },
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  consultationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Consultation' 
  },
  diagnosis: { type: String, required: true },
  description: String,
  fileUrl: { type: String, required: true },
  followUpDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);