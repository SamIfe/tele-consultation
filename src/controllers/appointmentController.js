
const appointmentService = require('../services/appointmentService');
const { authenticateToken } = require('../middleware/auth');

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async getAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.getAppointmentById(req.params.appointmentId);
      if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
      res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async updateAppointmentStatus(req, res, next) {
    try {
      const { status } = req.body;
      const updatedAppointment = await appointmentService.updateAppointmentStatus(
        req.params.appointmentId,
        status
      );
      res.json(updatedAppointment);
    } catch (error) {
      next(error);
    }
  }

  async getPatientAppointments(req, res, next) {
    try {
      const appointments = await appointmentService.getPatientAppointments(req.user.userId);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorAppointments(req, res, next) {
    try {
      const appointments = await appointmentService.getDoctorAppointments(req.user.userId);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async checkAvailability(req, res, next) {
    try {
      const { doctorId, date, timeSlot } = req.query;
      const available = await appointmentService.checkSlotAvailability(doctorId, date, timeSlot);
      res.json({ available });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();