
const authService = require('../services/authService');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.registerUser(req.body);
      res.status(201).json({
        message: 'User registered successfully',
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser(email, password);
      res.json({
        message: 'Login successful',
        ...result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();