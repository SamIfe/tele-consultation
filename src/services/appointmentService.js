const Appointment = require('../models/Appointment');
const { generateId } = require('../utils/idGenerator');
const { APPOINTMENT_STATUS } = require('../utils/constants');

class AppointmentService {
  async createAppointment(appointmentData) {
    const appointment = new Appointment({
      ...appointmentData,
      appointmentId: generateId('APT'),
      status: APPOINTMENT_STATUS.PENDING
    });
    return await appointment.save();
  }

  async getAppointmentById(appointmentId) {
    return await Appointment.findOne({ appointmentId });
  }

  async updateAppointmentStatus(appointmentId, status) {
    return await Appointment.findOneAndUpdate(
      { appointmentId },
      { $set: { status } },
      { new: true }
    );
  }

  async getPatientAppointments(patientId) {
    return await Appointment.find({ patientId });
  }

  async getDoctorAppointments(doctorId) {
    return await Appointment.find({ doctorId });
  }

  async checkSlotAvailability(doctorId, date, timeSlot) {
    const existing = await Appointment.findOne({ 
      doctorId, 
      date, 
      timeSlot,
      status: { $in: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.CONFIRMED] }
    });
    return !existing;
  }
}

module.exports = new AppointmentService();