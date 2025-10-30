import express from 'express';
import Teacher from '../models/Teacher.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route - Get all active teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true }).sort({ priority: -1, createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes - protected, must be before public /:id route
router.post('/', authenticate, upload.single('photo'), async (req, res) => {
  try {
    console.log('Teacher creation request body:', req.body);
    console.log('Uploaded file:', req.file);

    const teacherData = { ...req.body };
    if (req.file) {
      teacherData.photo = req.file.filename;
      console.log('Photo filename saved:', req.file.filename);
    }

    const teacher = new Teacher(teacherData);
    await teacher.save();

    console.log('Teacher created successfully:', teacher._id);

    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticate, upload.single('photo'), async (req, res) => {
  try {
    console.log('Teacher update request for ID:', req.params.id);
    console.log('Update data:', req.body);
    console.log('Uploaded file:', req.file);

    const teacherData = { ...req.body };
    if (req.file) {
      teacherData.photo = req.file.filename;
      console.log('New photo filename:', req.file.filename);
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      teacherData,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    console.log('Teacher updated successfully:', teacher._id);

    res.json({ message: 'Teacher updated successfully', teacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Get teacher by ID (must be last to avoid conflicts)
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || !teacher.isActive) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;