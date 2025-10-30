import mongoose from 'mongoose';
import { encrypt, decrypt } from '../utils/encryption.js';

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    enum: [
      'Head Teacher',
      'Vice Principal',
      '+2 Management Faculty',
      '+2 Education Faculty',
      '+2 Computer Engineering Faculty',
      'Pre-primary Teacher',
      'Basic Level Teacher',
      'Secondary Level Teacher',
      'Non-Teaching Staff'
    ]
  },
  subject: {
    type: String,
    trim: true
  },
  responsibility: {
    type: String,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  photo: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    set: (v) => v ? encrypt(v) : '',
    get: (v) => v ? decrypt(v) : ''
  },
  email: {
    type: String,
    set: (v) => v ? encrypt(v) : '',
    get: (v) => v ? decrypt(v) : ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

export default mongoose.model('Staff', staffSchema);