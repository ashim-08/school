import express from 'express';
import AdminMessage from '../models/AdminMessage.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route - Get all active admin messages
router.get('/', async (req, res) => {
  try {
    const messages = await AdminMessage.find({ isActive: true })
      .sort({ priority: -1, createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes - must be before /:id route to avoid conflicts
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const messages = await AdminMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticate, upload.single('authorPhoto'), async (req, res) => {
  try {
    const messageData = { ...req.body };
    if (req.file) {
      messageData.authorPhoto = req.file.filename;
    }

    const message = new AdminMessage(messageData);
    await message.save();

    res.status(201).json({ message: 'Admin message created successfully', adminMessage: message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticate, upload.single('authorPhoto'), async (req, res) => {
  try {
    const messageData = { ...req.body };
    if (req.file) {
      messageData.authorPhoto = req.file.filename;
    }

    const message = await AdminMessage.findByIdAndUpdate(
      req.params.id,
      messageData,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Admin message not found' });
    }

    res.json({ message: 'Admin message updated successfully', adminMessage: message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const message = await AdminMessage.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Admin message not found' });
    }

    res.json({ message: 'Admin message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/recover', authenticate, async (req, res) => {
  try {
    const message = await AdminMessage.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Admin message not found' });
    }

    res.json({ message: 'Admin message recovered successfully', adminMessage: message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id/permanent', authenticate, async (req, res) => {
  try {
    const message = await AdminMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Admin message not found' });
    }

    res.json({ message: 'Admin message permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Get message by ID (must be last to avoid conflicts)
router.get('/:id', async (req, res) => {
  try {
    const message = await AdminMessage.findById(req.params.id);
    if (!message || !message.isActive) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;