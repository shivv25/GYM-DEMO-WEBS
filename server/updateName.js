import mongoose from 'mongoose';
import Gym from './models/Gym.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const updateDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const gym = await Gym.findOne();
    if (gym) {
      gym.name = 'XYZ FIT';
      
      // Update nested hero heading if it exists
      if (gym.hero && gym.hero.subheading) {
        gym.hero.subheading = gym.hero.subheading.replace(/NEUROFIT/gi, 'XYZ FIT');
      }

      // Update about sections
      if (gym.about) {
        if (gym.about.shortDescription) {
          gym.about.shortDescription = gym.about.shortDescription.replace(/NEUROFIT/gi, 'XYZ FIT');
        }
      }

      // Update transformation quote
      if (gym.transformation && gym.transformation.quote) {
        gym.transformation.quote = gym.transformation.quote.replace(/NEUROFIT/gi, 'XYZ FIT');
      }

      // Update FAQ answers
      if (gym.faq && gym.faq.length > 0) {
        gym.faq = gym.faq.map(item => {
          return {
            ...item,
            question: item.question.replace(/NEUROFIT/gi, 'XYZ FIT'),
            answer: item.answer.replace(/NEUROFIT/gi, 'XYZ FIT')
          };
        });
      }

      // We won't change emails or contact just in case it breaks login, but let's change contact email if it exists for display
      if (gym.contact && gym.contact.email) {
        gym.contact.email = gym.contact.email.replace(/neurofit/gi, 'xyzfit');
      }

      // Keep the admin login email the same so they don't get locked out.

      await gym.save();
      console.log('Successfully updated gym database document.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateDB();
