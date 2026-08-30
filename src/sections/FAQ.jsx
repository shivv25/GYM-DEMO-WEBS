import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import SectionHeading from '../components/SectionHeading';
import FAQItem from '../components/FAQItem';

const FAQ = () => {
  const { gym } = useGym();
  const [openIndex, setOpenIndex] = useState(0);
  
  if (!gym?.faq) return null;

  const toggleOpen = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-24 bg-[#0a0a0a] text-white" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="Got questions? We've got answers." 
          centered 
        />
        
        <div className="mt-16 space-y-4">
          {gym.faq.map((item, idx) => (
            <FAQItem 
              key={idx} 
              faq={item} 
              isOpen={openIndex === idx} 
              onToggle={() => toggleOpen(idx)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
