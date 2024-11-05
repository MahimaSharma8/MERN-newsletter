import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const photo_schema = new Schema({
  index: { 
      type: Number, 
      required: true 
  },
  src: { 
      type: String, 
      required: true 
  }
});
const text_schema = new Schema({
  index: { 
      type: Number, 
      required: true 
  },
  text: { 
      type: String, 
      required: true 
  }
});

const userSchema = new Schema({
  Author: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  headline: {
    type: String,
    required: true
  },
  Textcontent:[text_schema],
  Photos: [photo_schema]

}, { collection: 'users' });

const User = mongoose.model('User', userSchema);
export default User;
