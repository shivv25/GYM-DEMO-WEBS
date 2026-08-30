import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const removeFaq = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym && gym.faq) {
      // Filter out the specific question
      gym.faq = gym.faq.filter(item => !item.question.includes("What makes XYZ FIT different"));
      await gym.save();
      console.log('Successfully removed FAQ from database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

removeFaq();
