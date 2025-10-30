import express from 'express';
import AdmissionContent from '../models/AdmissionContent.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public route - Get admission content
router.get('/', async (req, res) => {
  try {
    let content = await AdmissionContent.findOne({ isActive: true });
    if (!content) {
      // Create default content if none exists
      content = new AdmissionContent({
        title: 'Admissions Open',
        subtitle: 'Join our community of learners',
        description: 'We are now accepting applications for the new academic session.',
        content: 'Detailed admission information will be available here.',
        admissionProcess: [],
        requiredDocuments: [],
        importantDates: [],
        fees: {},
        contactInfo: {}
      });
      await content.save();
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes
router.use(authenticate);

// Get admission content for admin
router.get('/admin', async (req, res) => {
  try {
    const content = await AdmissionContent.findOne({ isActive: true });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let content = await AdmissionContent.findOne({ isActive: true });
    
    if (!content) {
      content = new AdmissionContent(req.body);
    } else {
      Object.assign(content, req.body);
    }
    
    await content.save();
    res.json({ message: 'Admission content updated successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;