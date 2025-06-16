
const doctorService = require('./services/doctorService');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

class DoctorController {
  async createDoctor(req, res, next) {
    try {
      const doctor = await doctorService.createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorProfile(req, res, next) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.doctorId);
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  }

  async updateDoctorProfile(req, res, next) {
    try {
      const updatedDoctor = await doctorService.updateDoctor(
        req.params.doctorId,
        req.body
      );
      res.json(updatedDoctor);
    } catch (error) {
      next(error);
    }
  }

  async searchDoctors(req, res, next) {
    try {
      const { specialization, name, minRating } = req.query;
      const doctors = await doctorService.searchDoctors(specialization, name, minRating);
      res.json(doctors);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorReviews(req, res, next) {
    try {
      const reviews = await doctorService.getDoctorReviews(req.params.doctorId);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DoctorController();