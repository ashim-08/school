import express from 'express';
import Gallery from '../models/Gallery.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route - Get gallery images
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) {
      filter.category = category;
    }

    const images = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes - protected
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    console.log('Gallery upload request body:', req.body);
    console.log('Uploaded file:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const galleryData = {
      ...req.body,
      image: req.file.filename
    };

    console.log('Gallery data to save:', galleryData);

    const gallery = new Gallery(galleryData);
    await gallery.save();

    console.log('Gallery image saved successfully:', gallery._id);

    res.status(201).json({ message: 'Image uploaded successfully', gallery });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!gallery) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;