import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateFeatures = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym && gym.whyChooseUs && gym.whyChooseUs.features) {
      gym.whyChooseUs.features = gym.whyChooseUs.features.filter(
        (f) => f.title !== 'AI-Powered Programs' && f.title !== 'Data-Driven Results'
      );
      await gym.save();
      console.log('Successfully removed AI and Data features from database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateFeatures();
