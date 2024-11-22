import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'User' } 

}, { collection: 'register'});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
