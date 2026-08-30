import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateFaq = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym && gym.faq) {
      gym.faq = gym.faq.map(item => {
        if (item.question.includes("free trial") || item.answer.includes("3-day")) {
          return {
            ...item,
            answer: item.answer.replace("3-day", "1-day")
          };
        }
        return item;
      });
      await gym.save();
      console.log('Successfully updated FAQ.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateFaq();
