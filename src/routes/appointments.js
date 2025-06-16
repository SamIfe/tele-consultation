
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticateToken } = require('../middleware/auth');

router.get('/availability', appointmentController.checkAvailability);

router.get('/:appointmentId', 
  authenticateToken, 
  appointmentController.getAppointment
);

router.get('/patient/me', 
  authenticateToken, 
  appointmentController.getPatientAppointments
);

router.get('/doctor/me', 
  authenticateToken, 
  appointmentController.getDoctorAppointments
);

router.post('/', 
  authenticateToken, 
  appointmentController.createAppointment
);

router.put('/:appointmentId/status', 
  authenticateToken, 
  appointmentController.updateAppointmentStatus
);

module.exports = router;