import mongoose from 'mongoose';
import { encrypt, decrypt } from '../utils/encryption.js';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
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

export default mongoose.model('Teacher', teacherSchema);