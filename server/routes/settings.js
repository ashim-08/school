import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all admin accounts
router.get('/admins', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin accounts', error: error.message });
  }
});

// Create new admin account (Super Admin only)
router.post('/admins', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can create admin accounts' });
    }

    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({
      username,
      password,
      role: role || 'admin'
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin account', error: error.message });
  }
});

// Update own credentials
router.put('/credentials', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    if (newUsername) {
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      user.username = newUsername;
    }

    if (newPassword) {
      user.password = newPassword;
    }

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ message: 'Credentials updated successfully', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error updating credentials', error: error.message });
  }
});

// Delete admin account (Super Admin only)
router.delete('/admins/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can delete admin accounts' });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Admin account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin account', error: error.message });
  }
});

// Toggle admin account status (Super Admin only)
router.put('/admins/:id/toggle-status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can change admin status' });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot change your own account status' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ message: 'Admin status updated successfully', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin status', error: error.message });
  }
});

export default router;
