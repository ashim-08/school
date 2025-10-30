import mongoose from 'mongoose';
import { encrypt, decrypt } from '../utils/encryption.js';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    set: encrypt,
    get: decrypt
  },
  phone: {
    type: String,
    set: (v) => v ? encrypt(v) : '',
    get: (v) => v ? decrypt(v) : ''
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    set: encrypt,
    get: decrypt
  },
  isRead: {
    type: Boolean,
    default: false
  },
  reply: {
    type: String,
    set: (v) => v ? encrypt(v) : '',
    get: (v) => v ? decrypt(v) : ''
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

export default mongoose.model('Contact', contactSchema);