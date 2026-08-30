import React from 'react';
import { useGym } from '../context/GymContext';
import SectionHeading from '../components/SectionHeading';
import TestimonialCard from '../components/TestimonialCard';

const Testimonials = () => {
  const { gym } = useGym();
  
  if (!gym?.testimonials) return null;

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Member Stories" 
          subtitle="Don't just take our word for it." 
        />
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 mt-12 scrollbar-hide">
          {gym.testimonials.map((testimonial, idx) => (
            <div key={idx} className="min-w-[300px] md:min-w-[400px] snap-center">
              <TestimonialCard testimonial={testimonial} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
