
const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const paymentRoutes = require('./routes/payments');
const reviewRoutes = require('./routes/reviews');
const medicalRecordRoutes = require('./routes/medicalRecords');
const consultationRoutes = require('./routes/consultations');

const app = express();

console.log('=== DEBUGGING ROUTE IMPORTS ===');
console.log('authRoutes:', typeof authRoutes, authRoutes);
console.log('doctorRoutes:', typeof doctorRoutes, doctorRoutes);
console.log('appointmentRoutes:', typeof appointmentRoutes, appointmentRoutes);
console.log('paymentRoutes:', typeof paymentRoutes, paymentRoutes);
console.log('reviewRoutes:', typeof reviewRoutes, reviewRoutes);
console.log('medicalRecordRoutes:', typeof medicalRecordRoutes, medicalRecordRoutes);
console.log('consultationRoutes:', typeof consultationRoutes, consultationRoutes);
console.log('=== END DEBUGGING ===');

connectDatabase();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/consultations', consultationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

module.exports = app;