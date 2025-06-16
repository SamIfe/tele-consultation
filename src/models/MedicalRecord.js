

const medicalRecordSchema = new mongoose.Schema({
  recordId: { type: String, unique: true, required: true },
  patientId: { type: String, required: true },
  consultationId: { type: String, required: true },
  diagnosis: String,
  prescription: [{
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  labTests: [String],
  followUpDate: Date,
  attachments: [String], // File paths
  createdAt: { type: Date, default: Date.now }
});