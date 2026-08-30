import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateNumbers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      if (gym.stats && gym.stats.length > 0) {
        gym.stats[0].value = "5000";
      }
      if (gym.about && gym.about.shortDescription) {
        gym.about.shortDescription = gym.about.shortDescription.replace("50,000+", "5,000+");
      }
      if (gym.finalCTA && gym.finalCTA.subheading) {
        gym.finalCTA.subheading = gym.finalCTA.subheading.replace("50,000+", "5,000+");
      }
      await gym.save();
      console.log('Successfully updated member numbers to 5000+.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateNumbers();
