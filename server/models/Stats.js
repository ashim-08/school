import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  students: {
    type: Number,
    required: true,
    default: 700
  },
  teachers: {
    type: Number,
    required: true,
    default: 60
  },
  result: {
    type: Number,
    required: true,
    default: 98
  },
  satisfaction: {
    type: Number,
    required: true,
    default: 95
  }
}, {
  timestamps: true
});

export default mongoose.model('Stats', statsSchema);