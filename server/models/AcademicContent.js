import mongoose from 'mongoose';

const academicContentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      '+2 Management',
      '+2 Education', 
      '+2 Computer Engineering',
      'Pre-primary',
      'Basic',
      'Secondary'
    ]
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  subjects: [{
    type: String,
    trim: true
  }],
  duration: {
    type: String,
    trim: true
  },
  eligibility: {
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  fees: {
    admissionFee: Number,
    monthlyFee: Number,
    examFee: Number,
    otherFees: [{
      name: String,
      amount: Number
    }]
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

export default mongoose.model('AcademicContent', academicContentSchema);