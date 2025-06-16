const Doctor = require('../models/Doctor');
const Review = require('../models/Review');
const { generateId } = require('../utils/idGenerator');

class DoctorService {
  async createDoctor(doctorData) {
    const doctor = new Doctor({
      ...doctorData,
      doctorId: generateId('DOC')
    });
    return await doctor.save();
  }

  async getDoctorById(doctorId) {
    return await Doctor.findOne({ doctorId });
  }

  async updateDoctor(doctorId, updateData) {
    return await Doctor.findOneAndUpdate(
      { doctorId },
      { $set: updateData },
      { new: true }
    );
  }

  async searchDoctors(specialization, name, minRating) {
    let query = {};
    if (specialization) query.specialization = specialization;
    if (name) query.name = new RegExp(name, 'i');
    if (minRating) query.rating = { $gte: minRating };

    return await Doctor.find(query);
  }

  async getDoctorReviews(doctorId) {
    return await Review.find({ doctorId }).populate('patientId', 'name');
  }

  async calculateAverageRating(doctorId) {
    const reviews = await Review.find({ doctorId });
    if (reviews.length === 0) return 0;
    
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }
}

module.exports = new DoctorService();