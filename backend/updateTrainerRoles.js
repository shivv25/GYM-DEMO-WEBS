import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateTrainerRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      gym.trainers.forEach(trainer => {
        if (trainer.id === 'alex') {
          trainer.role = 'Mobility and Flexibility Coach';
        }
        if (trainer.id === 'maya') {
          trainer.role = 'Strength Training Coach';
        }
      });
      await gym.save();
      console.log('Successfully updated trainer roles in database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateTrainerRoles();
