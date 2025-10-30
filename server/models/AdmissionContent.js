import mongoose from 'mongoose';

const admissionContentSchema = new mongoose.Schema({
  isOpen: {
    type: Boolean,
    default: false
  },
  openMessage: {
    type: String,
    default: 'We are currently accepting applications for the new academic session. Apply now to secure your seat!'
  },
  closedMessage: {
    type: String,
    default: 'Admissions are only open during the month of Baisakh (April-May). Please check back during the admission period.'
  },
  requirements: [{
    type: String
  }],
  title: {
    type: String,
    trim: true,
    default: 'Admissions Open'
  },
  subtitle: {
    type: String,
    trim: true,
    default: 'Join our community of learners'
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  admissionProcess: [{
    step: Number,
    title: String,
    description: String
  }],
  requiredDocuments: [{
    type: String,
    trim: true
  }],
  importantDates: [{
    event: String,
    date: String,
    description: String
  }],
  fees: {
    admissionFee: Number,
    registrationFee: Number,
    securityDeposit: Number,
    otherFees: [{
      name: String,
      amount: Number,
      description: String
    }]
  },
  contactInfo: {
    phone: String,
    email: String,
    address: String,
    officeHours: String
  },
  isAdmissionOpen: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('AdmissionContent', admissionContentSchema);