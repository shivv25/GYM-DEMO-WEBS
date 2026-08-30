import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateHeroAndAnnouncement = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      if (gym.announcement && gym.announcement.text) {
        gym.announcement.text = gym.announcement.text.replace('New Year Special', 'Newbie Special Offer');
      }
      if (gym.hero && gym.hero.reviewBadge && gym.hero.reviewBadge.text) {
        gym.hero.reviewBadge.text = gym.hero.reviewBadge.text.replace('50K+', '5K+');
      }
      await gym.save();
      console.log('Successfully updated announcement and hero texts in database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateHeroAndAnnouncement();
