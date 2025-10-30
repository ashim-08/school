import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/brahmarupa-school';
    console.log('Connecting to MongoDB:', mongoUri);
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Check if admin user exists
    const User = (await import('../models/User.js')).default;
    const adminCount = await User.countDocuments({ role: 'super-admin' });
    if (adminCount === 0) {
      console.log('⚠️  No admin user found. Run: npm run seed');
    } else {
      console.log('✅ Admin user exists in database');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Make sure MongoDB is running on your system');
    process.exit(1);
  }
};

export default connectDB;