import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const newPlans = [
  {
    id: "monthly",
    name: "MONTHLY",
    price: 999,
    currency: "₹",
    period: "month",
    description: "Perfect for getting started on your fitness journey",
    isPopular: false,
    features: [
      { text: "Full Gym Access", included: true },
      { text: "Locker Access", included: true },
      { text: "Cardio & Free Weights", included: true },
      { text: "Group Classes", included: true },
      { text: "Personal Training", included: false },
      { text: "Diet Guidance", included: false },
    ],
    cta: "Explore More",
  },
  {
    id: "half-yearly",
    name: "HALF YEARLY",
    price: 3999,
    currency: "₹",
    period: "6 months",
    description: "Our most popular plan for serious fitness enthusiasts",
    isPopular: true,
    features: [
      { text: "Full Gym Access", included: true },
      { text: "Premium Locker + Towel", included: true },
      { text: "Cardio & Free Weights", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "2 PT Sessions / Month", included: true },
      { text: "Basic Diet Guidance", included: true },
    ],
    cta: "Explore More",
  },
  {
    id: "yearly",
    name: "YEARLY",
    price: 8999,
    currency: "₹",
    period: "year",
    description: "Commit to your fitness and save big",
    isPopular: false,
    features: [
      { text: "24/7 Priority Access", included: true },
      { text: "VIP Locker + Amenities", included: true },
      { text: "Cardio & Free Weights", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "4 PT Sessions / Month", included: true },
      { text: "Custom Nutrition Plan", included: true },
    ],
    cta: "Explore More",
  },
];

const updatePlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      gym.plans = newPlans;
      await gym.save();
      console.log('Successfully updated gym plans to 3-tier structure.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updatePlans();
