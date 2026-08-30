import React from 'react';
import { useGym } from '../context/GymContext';
import SectionHeading from '../components/SectionHeading';
import PricingCard from '../components/PricingCard';

const Pricing = () => {
  const { gym } = useGym();
  
  if (!gym?.plans) return null;

  return (
    <section className="py-24 bg-[#0a0a0a] text-white relative" id="pricing">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Membership Plans" 
          subtitle="Choose the perfect plan for your fitness journey." 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-center max-w-6xl mx-auto">
          {gym.plans.map((plan, idx) => (
            <PricingCard key={plan.id || idx} plan={plan} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
