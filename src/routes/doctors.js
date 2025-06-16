const express = require('express');
const router = express.Router();
const doctorController = require('./controllers/doctorController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', doctorController.searchDoctors);
router.get('/:doctorId/reviews', doctorController.getDoctorReviews);
router.get('/:doctorId', doctorController.getDoctorProfile);

// Protected routes
router.post('/', 
  authenticateToken, 
  authorizeRoles('admin'), 
  doctorController.createDoctor
);

router.put('/:doctorId', 
  authenticateToken, 
  authorizeRoles('doctor', 'admin'), 
  doctorController.updateDoctorProfile
);

module.exports = router;