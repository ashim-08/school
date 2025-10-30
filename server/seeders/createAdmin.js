import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Stats from '../models/Stats.js';
import AdminMessage from '../models/AdminMessage.js';
import connectDB from '../config/database.js';

dotenv.config();

const createAdmin = async () => {
  try {
    console.log('Starting database seeding...');
    await connectDB();

    // Create default admin user
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        password: 'admin123',
        role: 'super-admin'
      });
      await admin.save();
      console.log('Admin user created: username=admin, password=admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Create default stats
    const statsExists = await Stats.findOne();
    if (!statsExists) {
      const stats = new Stats({
        students: 700,
        teachers: 60,
        result: 98,
        satisfaction: 95
      });
      await stats.save();
      console.log('Default stats created');
    } else {
      console.log('Stats already exist');
    }

    // Create default admin messages
    const messagesCount = await AdminMessage.countDocuments();
    if (messagesCount === 0) {
      const defaultMessages = [
        {
          title: 'Welcome Message from Head Teacher',
          authorName: 'Mr. Ram Bahadur Sharma',
          authorPosition: 'Head Teacher',
          message: 'Welcome to Shree Brahma Rupa Higher Secondary School. With over 65 years of educational excellence, we are committed to providing quality education that shapes the future leaders of our nation. Our dedicated faculty and modern facilities ensure that every student receives the best possible learning experience.',
          type: 'principal',
          priority: 10
        },
        {
          title: 'Message from Vice Principal',
          authorName: 'Mrs. Sita Devi Poudel',
          authorPosition: 'Vice Principal',
          message: 'At Brahma Rupa, we believe in holistic education that nurtures not just academic excellence but also character development. Our students are encouraged to participate in various co-curricular activities that help them grow into well-rounded individuals.',
          type: 'vice-principal',
          priority: 9
        },
        {
          title: 'Computer Engineering Program',
          authorName: 'Er. Prakash Adhikari',
          authorPosition: '+2 Computer Engineering Coordinator',
          message: 'Our Pre-Diploma Computer Engineering program is designed to provide students with a strong foundation in computer science and engineering. With modern computer labs and experienced faculty, we prepare our students for the challenges of the digital age.',
          type: 'management',
          priority: 8
        },
        {
          title: 'Management Studies Excellence',
          authorName: 'Mr. Bishnu Prasad Gautam',
          authorPosition: '+2 Management Coordinator',
          message: 'The Management program at our school focuses on developing future business leaders. Through practical learning and theoretical knowledge, we ensure our students are well-prepared for higher education and professional careers in business and management.',
          type: 'management',
          priority: 7
        }
      ];

      for (const messageData of defaultMessages) {
        const message = new AdminMessage(messageData);
        await message.save();
      }
      console.log('Default admin messages created');
    } else {
      console.log('Admin messages already exist');
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    console.log('Make sure MongoDB is running on your system');
    process.exit(1);
  }
};

createAdmin();