import express from 'express';
import Registration from '../models/register_model.js';
import bcrypt from 'bcrypt';
const SigninRouter = express.Router();

SigninRouter.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
      const registration = await Registration.findOne({ email });  // Look for Registration by email
      
      if (!registration) {
        return res.status(400).json({ message: 'Invalid email' });
      }
      const isMatch = await bcrypt.compare(password, registration.password);

  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const userRole = registration.role || 'User';

      res.status(200).json({ message: 'Sign-in successful', userRole });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

export default SigninRouter;
