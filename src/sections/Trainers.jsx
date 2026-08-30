import React from 'react';
import { useGym } from '../context/GymContext';
import SectionHeading from '../components/SectionHeading';
import TrainerCard from '../components/TrainerCard';

const Trainers = () => {
  const { gym } = useGym();
  
  if (!gym?.trainers) return null;

  return (
    <section className="py-24 bg-black text-white" id="trainers">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Meet Our Experts" 
          subtitle="Train with the best. Our certified professionals are here to guide you." 
          centered 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {gym.trainers.map((trainer, idx) => (
            <TrainerCard key={idx} trainer={trainer} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
