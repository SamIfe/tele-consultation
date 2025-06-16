


const consultationSchema = new mongoose.Schema({
  consultationId: { type: String, unique: true, required: true },
  appointmentId: { type: String, required: true },
  startDateTime: Date,
  endDateTime: Date,
  notes: String,
  chatMessages: [{
    sender: String, // 'patient' or 'doctor'
    message: String,
    timestamp: { type: Date, default: Date.now },
    messageType: { type: String, enum: ['text', 'image', 'file'], default: 'text' }
  }],
  status: { type: String, enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled' }
});