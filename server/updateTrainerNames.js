import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateTrainerNames = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      gym.trainers.forEach(trainer => {
        if (trainer.id === 'alex') {
          trainer.name = 'Siya';
          trainer.bio = trainer.bio.replace('Alex', 'Siya');
        }
        if (trainer.id === 'sarah') {
          trainer.name = 'Ronnie';
          trainer.bio = trainer.bio.replace('Sarah', 'Ronnie');
        }
        if (trainer.id === 'raj') {
          trainer.name = 'Cbum';
          trainer.bio = trainer.bio.replace('Raj', 'Cbum');
        }
        if (trainer.id === 'maya') {
          trainer.name = 'Sam';
          trainer.bio = trainer.bio.replace('Maya', 'Sam');
        }
      });
      await gym.save();
      console.log('Successfully updated trainer names in database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateTrainerNames();
