import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js';
import Teacher from '../models/Teacher.js';
import Staff from '../models/Staff.js';

dotenv.config();

async function migrateData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('\n🔒 Starting data migration for encryption...\n');

    const contactCount = await Contact.countDocuments();
    console.log(`📧 Migrating ${contactCount} contacts...`);
    if (contactCount > 0) {
      const contacts = await Contact.find({}).lean();
      for (const contact of contacts) {
        const doc = await Contact.findById(contact._id);
        doc.email = contact.email;
        doc.phone = contact.phone;
        doc.message = contact.message;
        doc.reply = contact.reply;
        await doc.save();
      }
      console.log(`✅ Migrated ${contactCount} contacts`);
    }

    const teacherCount = await Teacher.countDocuments();
    console.log(`\n👨‍🏫 Migrating ${teacherCount} teachers...`);
    if (teacherCount > 0) {
      const teachers = await Teacher.find({}).lean();
      for (const teacher of teachers) {
        const doc = await Teacher.findById(teacher._id);
        doc.email = teacher.email;
        doc.phone = teacher.phone;
        await doc.save();
      }
      console.log(`✅ Migrated ${teacherCount} teachers`);
    }

    const staffCount = await Staff.countDocuments();
    console.log(`\n👥 Migrating ${staffCount} staff members...`);
    if (staffCount > 0) {
      const staff = await Staff.find({}).lean();
      for (const member of staff) {
        const doc = await Staff.findById(member._id);
        doc.email = member.email;
        doc.phone = member.phone;
        await doc.save();
      }
      console.log(`✅ Migrated ${staffCount} staff members`);
    }

    console.log('\n✨ Migration completed successfully!');
    console.log('All sensitive data has been encrypted.');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

migrateData();
