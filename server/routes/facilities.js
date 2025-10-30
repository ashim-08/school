import express from 'express';
import Facility from '../models/Facility.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find({ isActive: true })
      .sort({ priority: -1, name: 1 });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ priority: -1, createdAt: -1 });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticate, upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const facilityData = { ...req.body };

    if (req.body.features && typeof req.body.features === 'string') {
      facilityData.features = JSON.parse(req.body.features);
    }

    if (req.files?.icon) {
      facilityData.icon = req.files.icon[0].filename;
    }

    if (req.files?.image) {
      facilityData.image = req.files.image[0].filename;
    }

    const facility = new Facility(facilityData);
    await facility.save();

    res.status(201).json({ message: 'Facility created successfully', facility });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticate, upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const facilityData = { ...req.body };

    if (req.body.features && typeof req.body.features === 'string') {
      facilityData.features = JSON.parse(req.body.features);
    }

    if (req.files?.icon) {
      facilityData.icon = req.files.icon[0].filename;
    }

    if (req.files?.image) {
      facilityData.image = req.files.image[0].filename;
    }

    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      facilityData,
      { new: true, runValidators: true }
    );

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json({ message: 'Facility updated successfully', facility });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/recover', authenticate, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json({ message: 'Facility recovered successfully', facility });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id/permanent', authenticate, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json({ message: 'Facility permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const facility = await Facility.findOne({ slug: req.params.slug, isActive: true });
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
