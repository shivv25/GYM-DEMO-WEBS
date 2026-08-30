import React from 'react';
import { useGym } from '../context/GymContext';
import SectionHeading from '../components/SectionHeading';
import ProgramCard from '../components/ProgramCard';

const Programs = () => {
  const { gym } = useGym();
  
  if (!gym?.programs) return null;

  return (
    <section className="py-24 bg-black text-white" id="programs">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Our Programs" 
          subtitle="Discover the perfect workout regime tailored to your fitness goals." 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {gym.programs.map((program, idx) => (
            <ProgramCard key={idx} program={program} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
