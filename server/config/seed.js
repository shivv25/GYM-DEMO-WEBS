import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Gym from '../models/Gym.js';
import Program from '../models/Program.js';
import Trainer from '../models/Trainer.js';
import Membership from '../models/Membership.js';
import Testimonial from '../models/Testimonial.js';
import Gallery from '../models/Gallery.js';
import FAQ from '../models/FAQ.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    const adminExists = await Admin.findOne({ email: 'admin@neurofit.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'Admin',
        email: 'admin@neurofit.com',
        password: 'NeuroFit@2024',
        role: 'superadmin'
      });
      console.log('Admin seeded.');
    } else {
      console.log('Admin already exists. Skipping...');
    }

    const gymExists = await Gym.findOne();
    if (!gymExists) {
      const gym = await Gym.create({
        name: 'NEUROFIT',
        tagline: 'Achieve Your Peak Performance',
        description: 'Premium fitness facility.',
        branding: { primaryColor: '#FF3B30', secondaryColor: '#1C1C1E', backgroundColor: '#000000', textColor: '#FFFFFF', mutedColor: '#8E8E93' },
        hero: {
          heading: ['ELEVATE', 'YOUR', 'POTENTIAL'],
          subheading: 'Join NEUROFIT today.',
          primaryCTA: { text: 'Join Now', link: '/membership' },
          secondaryCTA: { text: 'Learn More', link: '/about' }
        },
        contact: { phone: '1234567890', email: 'hello@neurofit.com', address: '123 Fitness St' },
        social: { instagram: '#', facebook: '#', youtube: '#', twitter: '#' },
        hours: [{ days: 'Mon - Fri', time: '6:00 AM - 10:00 PM' }, { days: 'Sat - Sun', time: '8:00 AM - 8:00 PM' }],
        stats: [{ value: '500+', label: 'Members', suffix: '' }],
        about: { shortDescription: 'We are NEUROFIT', mission: 'To empower individuals through fitness.', values: ['Discipline', 'Focus', 'Strength'] },
        announcement: { enabled: true, text: 'New classes available!', link: '/classes', linkText: 'View Classes' }
      });
      console.log('Gym config seeded.');
    } else {
      console.log('Gym config already exists. Skipping...');
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
