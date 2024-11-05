import express from "express";
import Registration from "../models/register_model.js";
import bcrypt from 'bcrypt';
const register = express.Router();

register.post('/', async (req, res) => {
    try {
        console.log('Incoming data:', req.body); 
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const aboutData = new Registration({
            ...req.body,  // Spread the rest of the fields from the request body
            password: hashedPassword  // Replace the plain-text password with the hashed password
        });
        await aboutData.save();
        res.status(201).send('Data added successfully');
    } catch (err) {
        console.error('Error adding data:', err); 
        res.status(400).json({ message: 'Error adding data', error: err.message }); 
    }
});

export default register;