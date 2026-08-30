import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateContact = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      if (!gym.contact) gym.contact = {};
      gym.contact.phone = "+91 98765 43xyz";
      gym.contact.email = "hello@xyzfit.in";
      gym.contact.address = "Main Road, Bistupur, Jamshedpur, Jharkhand 831001";
      await gym.save();
      console.log('Successfully updated gym contact information.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateContact();
