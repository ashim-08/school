import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    required: true,
    enum: ['ECD', 'Primary', 'Lower Secondary', 'Secondary', 'Higher Secondary', 'Pre-Diploma']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  subjects: [{
    type: String,
    trim: true
  }],
  eligibility: {
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
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

export default mongoose.model('Program', programSchema);