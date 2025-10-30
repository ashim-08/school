import express from 'express';
import Staff from '../models/Staff.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route - Get all active staff
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find({ isActive: true }).sort({ priority: -1, createdAt: -1 });
    
    // Group staff by position hierarchy
    const hierarchy = {
      'Head Teacher': [],
      'Vice Principal': [],
      '+2 Faculty': [],
      'School Level': [],
      'Non-Teaching Staff': []
    };

    staff.forEach(member => {
      if (member.position === 'Head Teacher') {
        hierarchy['Head Teacher'].push(member);
      } else if (member.position === 'Vice Principal') {
        hierarchy['Vice Principal'].push(member);
      } else if (member.position.includes('+2')) {
        hierarchy['+2 Faculty'].push(member);
      } else if (member.position.includes('Teacher')) {
        hierarchy['School Level'].push(member);
      } else {
        hierarchy['Non-Teaching Staff'].push(member);
      }
    });

    res.json({ staff, hierarchy });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes - protected, must be before public /:id route
router.post('/', authenticate, upload.single('photo'), async (req, res) => {
  try {
    const staffData = { ...req.body };
    if (req.file) {
      staffData.photo = req.file.filename;
    }

    const staff = new Staff(staffData);
    await staff.save();

    res.status(201).json({ message: 'Staff member created successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticate, upload.single('photo'), async (req, res) => {
  try {
    const staffData = { ...req.body };
    if (req.file) {
      staffData.photo = req.file.filename;
    }

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      staffData,
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.json({ message: 'Staff member updated successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public route - Get staff by ID (must be last to avoid conflicts)
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff || !staff.isActive) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;