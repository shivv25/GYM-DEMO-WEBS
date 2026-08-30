import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useGym } from '../context/GymContext';

const FinalCTA = () => {
  const { gym } = useGym();
  
  if (!gym?.finalCTA) return null;
  const { finalCTA } = gym;

  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)]" />
      
      <motion.div 
        className="container mx-auto px-4 relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl font-hero uppercase font-black text-white mb-6 drop-shadow-xl max-w-4xl leading-tight">
          {finalCTA.heading || "Ready to Transform Your Life?"}
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl font-medium">
          {finalCTA.subheading || "Join us today and start your journey towards a healthier, stronger you."}
        </p>
        
        <a href="#contact" className="px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-wider rounded-xl hover:bg-gray-100 hover:scale-105 transition-all flex items-center gap-3 group shadow-2xl">
          {finalCTA.ctaText || "Join Now"}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
