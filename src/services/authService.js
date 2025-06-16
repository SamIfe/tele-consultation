const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { generateId } = require('../utils/idGenerator');

class AuthService {
  async registerUser(userData) {
    const { name, email, password, userRole, phoneNumber, dateOfBirth } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = generateId('USER');
    const user = new User({
      userId,
      name,
      email,
      password: hashedPassword,
      userRole,
      phoneNumber,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
    });

    await user.save();

    if (userRole === 'patient') {
      const patient = new Patient({
        userId,
        medicalHistory: userData.medicalHistory || ''
      });
      await patient.save();
    } else if (userRole === 'doctor') {
      const doctor = new Doctor({
        userId,
        specialization: userData.specialization,
        licenseNumber: userData.licenseNumber,
        consultationFee: userData.consultationFee || 10000
      });
      await doctor.save();
    }

    const token = this.generateToken(userId, email, userRole);

    return {
      token,
      user: { userId, name, email, userRole }
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.userId, user.email, user.userRole);

    let roleData = {};
    if (user.userRole === 'doctor') {
      roleData = await Doctor.findOne({ userId: user.userId });
    } else if (user.userRole === 'patient') {
      roleData = await Patient.findOne({ userId: user.userId });
    }

    return {
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        userRole: user.userRole,
        phoneNumber: user.phoneNumber,
        ...roleData?._doc
      }
    };
  }

  generateToken(userId, email, userRole) {
    return jwt.sign(
      { userId, email, userRole },
      process.env.JWT_SECRET || 'consultcare_secret',
      { expiresIn: '24h' }
    );
  }
}

module.exports = new AuthService();