import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const newPrograms = [
    {
      id: "strength-conditioning",
      name: "Strength and Conditioning",
      description: "Heavy weight training and machine workouts to build muscle mass and physical strength.",
      icon: "Dumbbell",
      difficulty: "Intermediate",
      duration: "60 min",
    },
    {
      id: "zumba",
      name: "Zumba",
      description: "A high-energy, dance-based cardio workout set to upbeat Latin and international music.",
      icon: "Music",
      difficulty: "All Levels",
      duration: "45 min",
    },
    {
      id: "yoga",
      name: "Yoga",
      description: "Traditional and modern variations (like Power Yoga) focused on flexibility, core strength, and mental wellness.",
      icon: "Heart",
      difficulty: "All Levels",
      duration: "60 min",
    },
    {
      id: "hiit",
      name: "High-Intensity Interval Training (HIIT)",
      description: "Quick, explosive bursts of exercise paired with short recovery periods for maximum calorie burn.",
      icon: "Zap",
      difficulty: "Advanced",
      duration: "30 min",
    },
    {
      id: "functional",
      name: "Functional Training",
      description: "Everyday movement exercises using tools like battle ropes, kettlebells, and TRX suspension straps.",
      icon: "Activity",
      difficulty: "Intermediate",
      duration: "50 min",
    },
    {
      id: "pt",
      name: "Personal Training (PT)",
      description: "Customized, one-on-one workout plans and form correction led by a certified fitness coach.",
      icon: "User",
      difficulty: "All Levels",
      duration: "60 min",
    },
    {
      id: "spinning",
      name: "Spinning",
      description: "Intense indoor group cycling classes designed to boost cardiovascular endurance and leg strength.",
      icon: "Timer",
      difficulty: "Intermediate",
      duration: "45 min",
    },
    {
      id: "aerobics",
      name: "Aerobics",
      description: "Classic rhythmic group exercise routines structured to improve heart health and stamina.",
      icon: "Flame",
      difficulty: "Beginner",
      duration: "45 min",
    },
];

const updatePrograms = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      gym.programs = newPrograms;
      await gym.save();
      console.log('Successfully updated programs array in database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updatePrograms();
