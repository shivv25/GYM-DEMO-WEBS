import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      gym.gallery = [
        { id: 1, image: "/images/gallery-1.jpg", caption: "Dumbbell section", category: "Facility" },
        { id: 2, image: "/images/gallery-2.jpg", caption: "Back workout section", category: "Training" },
        { id: 3, image: "/images/gallery-3.jpg", caption: "Leg workout section", category: "Training" },
        { id: 4, image: "/images/gallery-4.jpg", caption: "Chest workout section", category: "Training" },
        { id: 5, image: "/images/gallery-5.jpg", caption: "Arms workout section", category: "Training" },
        { id: 6, image: "/images/gallery-6.jpg", caption: "Yoga & Cardio section", category: "Classes" },
        { id: 7, image: "/images/gallery-7.jpg", caption: "Deadlift section", category: "Facility" },
      ];
      await gym.save();
      console.log('Successfully updated gallery array in database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateGallery();
