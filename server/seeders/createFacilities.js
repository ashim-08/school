import mongoose from 'mongoose';
import Facility from '../models/Facility.js';
import dotenv from 'dotenv';

dotenv.config();

const facilities = [
  {
    name: 'Transportation',
    slug: 'transportation',
    description: 'Safe and comfortable transportation facilities for students with GPS tracking and trained drivers.',
    features: [
      'GPS-enabled buses for real-time tracking',
      'Well-maintained fleet of vehicles',
      'Trained and experienced drivers',
      'Door-to-door pickup and drop service',
      'CCTV surveillance in all vehicles'
    ],
    priority: 8,
    isActive: true
  },
  {
    name: 'Computer Lab',
    slug: 'computer-lab',
    description: 'Modern computer lab equipped with latest technology to enhance digital literacy and coding skills.',
    features: [
      'High-speed internet connectivity',
      'Latest computers with modern processors',
      'Educational software and programming tools',
      'Dedicated lab instructors',
      'Air-conditioned environment'
    ],
    priority: 7,
    isActive: true
  },
  {
    name: 'Medicare',
    slug: 'medicare',
    description: 'Well-equipped medical room with trained staff to handle emergencies and routine health checkups.',
    features: [
      'Qualified medical staff on duty',
      'First aid and emergency medical equipment',
      'Regular health checkup programs',
      'Tie-up with nearby hospitals',
      'Medicine stock for common ailments'
    ],
    priority: 6,
    isActive: true
  },
  {
    name: 'Sports & Games',
    slug: 'sports-games',
    description: 'Comprehensive sports facilities including playground, indoor games, and trained coaches.',
    features: [
      'Large playground for outdoor sports',
      'Indoor sports facilities',
      'Professional sports equipment',
      'Trained sports coaches',
      'Annual sports events and competitions'
    ],
    priority: 5,
    isActive: true
  },
  {
    name: 'Library',
    slug: 'library',
    description: 'Extensive library with a vast collection of books, journals, and digital resources.',
    features: [
      'Large collection of books across subjects',
      'Reference books and journals',
      'Digital library with e-books',
      'Comfortable reading environment',
      'Library management system'
    ],
    priority: 4,
    isActive: true
  },
  {
    name: 'Science Lab',
    slug: 'science-lab',
    description: 'Well-equipped science laboratories for practical learning in biology, physics, and chemistry.',
    features: [
      'Modern laboratory equipment',
      'Safety measures and protocols',
      'Trained lab assistants',
      'Regular practical sessions',
      'Project and research facilities'
    ],
    priority: 3,
    isActive: true
  },
  {
    name: 'Smart Class',
    slug: 'smart-class',
    description: 'Digital classrooms with smart boards and multimedia tools for interactive learning.',
    features: [
      'Interactive smart boards',
      'Projectors and audio systems',
      'Digital learning content',
      'Video conferencing capabilities',
      'Engaging multimedia presentations'
    ],
    priority: 2,
    isActive: true
  },
  {
    name: 'Physics & Chemistry Lab (+2)',
    slug: 'physics-chemistry-lab',
    description: 'Specialized advanced laboratories for higher secondary students with sophisticated equipment.',
    features: [
      'Advanced research equipment',
      'Separate labs for physics and chemistry',
      'Safety equipment and protocols',
      'Expert lab instructors',
      'Project and research support'
    ],
    priority: 1,
    isActive: true
  }
];

async function seedFacilities() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Facility.deleteMany({});
    console.log('Cleared existing facilities');

    await Facility.insertMany(facilities);
    console.log('Sample facilities created successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding facilities:', error);
    process.exit(1);
  }
}

seedFacilities();
