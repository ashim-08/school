import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true
  },
  className: {
    type: String,
    required: true,
    enum: [
      'ECD', 'Nursery', 'LKG', 'UKG',
      'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
      'Grade 6', 'Grade 7', 'Grade 8',
      'Grade 9', 'Grade 10',
      'Grade 11 Management', 'Grade 11 Education', 'Grade 11 Computer',
      'Grade 12 Management', 'Grade 12 Education', 'Grade 12 Computer'
    ]
  },
  examType: {
    type: String,
    required: true,
    enum: ['First Terminal', 'Second Terminal', 'Third Terminal', 'Final', 'SEE', 'NEB']
  },
  academicYear: {
    type: String,
    required: true
  },
  subjects: [{
    name: String,
    fullMarks: Number,
    passMarks: Number,
    obtainedMarks: Number,
    grade: String,
    remarks: String
  }],
  totalMarks: {
    type: Number,
    required: true
  },
  obtainedMarks: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  division: {
    type: String
  },
  rank: {
    type: Number
  },
  remarks: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Result', resultSchema);