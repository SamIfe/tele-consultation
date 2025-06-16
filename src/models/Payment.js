const mongoose = require('mongoose');
const { PAYMENT_STATUS } = require('../utils/constants');

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true, required: true },
  appointmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true 
  },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { 
    type: String, 
    enum: Object.values(PAYMENT_STATUS), 
    default: PAYMENT_STATUS.PENDING 
  },
  transactionReference: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);