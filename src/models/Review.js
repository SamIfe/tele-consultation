

const reviewSchema = new mongoose.Schema({
  reviewId: { type: String, unique: true, required: true },
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  appointmentId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});