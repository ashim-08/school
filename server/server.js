import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import teacherRoutes from './routes/teachers.js';
import reviewRoutes from './routes/reviews.js';
import statsRoutes from './routes/stats.js';
import programRoutes from './routes/programs.js';
import galleryRoutes from './routes/gallery.js';
import contactRoutes from './routes/contact.js';
import staffRoutes from './routes/staff.js';
import noticeRoutes from './routes/notices.js';
import resultRoutes from './routes/results.js';
import adminMessageRoutes from './routes/adminMessages.js';
import academicContentRoutes from './routes/academicContent.js';
import admissionContentRoutes from './routes/admissionContent.js';
import settingsRoutes from './routes/settings.js';
import facilityRoutes from './routes/facilities.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting server...');
console.log('Environment variables loaded');

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin-messages', adminMessageRoutes);
app.use('/api/academic-content', academicContentRoutes);
app.use('/api/admission-content', admissionContentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/facilities', facilityRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test route for uploads
app.get('/api/test-upload', (req, res) => {
  const uploadsPath = path.join(__dirname, '../uploads');
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Cannot read uploads directory', details: err.message });
    }
    res.json({ 
      uploadsDirectory: uploadsPath,
      files: files,
      totalFiles: files.length
    });
  });
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large' });
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ message: 'Unexpected file field' });
  }
  
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- POST /api/auth/login');
  console.log('- GET /api/health');
  console.log('- Static files: /uploads/*');
});