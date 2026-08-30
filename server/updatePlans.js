import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const newPlans = [
  {
    id: "day-pass",
    name: "DAY PASS",
    price: 299,
    currency: "₹",
    period: "day",
    description: "Perfect for drop-ins and travelers",
    isPopular: false,
    features: [
      { text: "Full Gym Access", included: true },
      { text: "Locker Access", included: true },
      { text: "Group Classes", included: false },
      { text: "Personal Training", included: false },
      { text: "Recovery Zone", included: false },
    ],
    cta: "GET PASS",
  },
  {
    id: "basic",
    name: "BASIC",
    price: 999,
    currency: "₹",
    period: "month",
    description: "Perfect for getting started on your fitness journey",
    isPopular: false,
    features: [
      { text: "Gym Access (6AM–10PM)", included: true },
      { text: "Locker Access", included: true },
      { text: "Cardio Area", included: true },
      { text: "Free Weights Zone", included: true },
      { text: "2 Group Classes / Week", included: true },
      { text: "Personal Training", included: false },
      { text: "Diet Guidance", included: false },
      { text: "Progress Tracking App", included: false },
      { text: "Recovery Zone Access", included: false },
    ],
    cta: "GET STARTED",
  },
  {
    id: "pro",
    name: "PRO",
    price: 1999,
    currency: "₹",
    period: "month",
    description: "Our most popular plan for serious fitness enthusiasts",
    isPopular: true,
    features: [
      { text: "24/7 Gym Access", included: true },
      { text: "Premium Locker + Towel", included: true },
      { text: "Full Equipment Access", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "4 PT Sessions / Month", included: true },
      { text: "Basic Diet Guidance", included: true },
      { text: "Progress Tracking App", included: true },
      { text: "Recovery Zone Access", included: false },
      { text: "1-on-1 Nutrition Plan", included: false },
    ],
    cta: "JOIN PRO",
  },
  {
    id: "elite",
    name: "ELITE",
    price: 3499,
    currency: "₹",
    period: "month",
    description: "The ultimate package for maximum results",
    isPopular: false,
    features: [
      { text: "24/7 Priority Access", included: true },
      { text: "VIP Locker + Amenities", included: true },
      { text: "Full Equipment Access", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "12 PT Sessions / Month", included: true },
      { text: "Custom Nutrition Plan", included: true },
      { text: "Advanced Progress Analytics", included: true },
      { text: "Recovery Zone + Sauna", included: true },
      { text: "Priority Booking + Support", included: true },
    ],
    cta: "GO ELITE",
  },
  {
    id: "annual",
    name: "ANNUAL",
    price: 19999,
    currency: "₹",
    period: "year",
    description: "Commit to your fitness and save big",
    isPopular: false,
    features: [
      { text: "Everything in ELITE", included: true },
      { text: "Save over 15%", included: true },
      { text: "2 Free Guest Passes/Mo", included: true },
      { text: "Free Merchandise Pack", included: true },
      { text: "Exclusive VIP Events", included: true },
    ],
    cta: "JOIN ANNUAL",
  },
];

const updatePlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      gym.plans = newPlans;
      await gym.save();
      console.log('Successfully updated gym plans.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updatePlans();
