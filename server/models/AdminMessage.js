import mongoose from 'mongoose';

const adminMessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  authorPosition: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  authorPhoto: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['principal', 'vice-principal', 'management', 'other'],
    default: 'principal'
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
  timestamps: true
});

export default mongoose.model('AdminMessage', adminMessageSchema);