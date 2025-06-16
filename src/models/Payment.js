

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true, required: true },
  appointmentId: { type: String, required: true },
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['paystack', 'flutterwave', 'bank_transfer'], required: true },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'refunded'], 
    default: 'pending' 
  },
  transactionReference: String,
  paystackReference: String, // For Paystack integration
  createdAt: { type: Date, default: Date.now }
});