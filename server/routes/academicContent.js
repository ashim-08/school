import express from 'express';
import AcademicContent from '../models/AcademicContent.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public route - Get all active academic content
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }

    const content = await AcademicContent.find(query).sort({ priority: -1, createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await AcademicContent.findById(req.params.id);
    if (!content || !content.isActive) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Get content by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const content = await AcademicContent.find({ 
      category: decodeURIComponent(category), 
      isActive: true 
    }).sort({ priority: -1, createdAt: -1 });
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes
router.use(authenticate);

// Get all content for admin
router.get('/admin/all', async (req, res) => {
  try {
    const content = await AcademicContent.find().sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const content = new AcademicContent(req.body);
    await content.save();
    res.status(201).json({ message: 'Academic content created successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const content = await AcademicContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Academic content not found' });
    }

    res.json({ message: 'Academic content updated successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const content = await AcademicContent.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Academic content not found' });
    }

    res.json({ message: 'Academic content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;