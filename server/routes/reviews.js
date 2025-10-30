import express from 'express';
import Review from '../models/Review.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route - Get approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true, isActive: true })
                                .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Submit review
router.post('/submit', upload.single('photo'), async (req, res) => {
  try {
    console.log('Review submission request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    const reviewData = { ...req.body };
    if (req.file) {
      reviewData.photo = req.file.filename;
      console.log('Review photo filename:', req.file.filename);
    }

    const review = new Review(reviewData);
    await review.save();
    
    console.log('Review submitted successfully:', review._id);

    res.status(201).json({ message: 'Review submitted successfully. It will be published after approval.' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes - protected
router.get('/admin', authenticate, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/approve', authenticate, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review approved successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;