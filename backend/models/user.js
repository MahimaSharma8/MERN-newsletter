import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Author: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  headline: {
    type: String,
    required: true
  },
  Textcontent:[{
    type: String,
    required: true
  }],
  Photos: [{
    type: String,
    required: true
  }],
  verified: 
  {
    type: Boolean,
    default: false
  }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);
export default User;
