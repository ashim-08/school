import express from 'express';
import Result from '../models/Result.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public route - Get classes with published results
router.get('/classes', async (req, res) => {
  try {
    const classes = await Result.distinct('className', { isPublished: true });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Get results by class
router.get('/class/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const { examType, academicYear } = req.query;
    
    let query = { 
      className: decodeURIComponent(className), 
      isPublished: true 
    };
    
    if (examType) query.examType = examType;
    if (academicYear) query.academicYear = academicYear;

    const results = await Result.find(query).sort({ rank: 1, percentage: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Get exam types for a class
router.get('/class/:className/exams', async (req, res) => {
  try {
    const { className } = req.params;
    const examTypes = await Result.distinct('examType', { 
      className: decodeURIComponent(className), 
      isPublished: true 
    });
    res.json(examTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes
router.use(authenticate);

// Get all results for admin
router.get('/admin/all', async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json({ message: 'Result created successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json({ message: 'Result updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Publish/unpublish results
router.patch('/:id/publish', async (req, res) => {
  try {
    const { isPublished } = req.body;
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json({ 
      message: `Result ${isPublished ? 'published' : 'unpublished'} successfully`, 
      result 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;