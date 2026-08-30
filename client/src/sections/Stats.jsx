import React from 'react';
import { motion } from 'framer-motion';
import { useGym } from '../context/GymContext';
import StatCounter from '../components/StatCounter';

const Stats = () => {
  const { gym } = useGym();
  
  if (!gym?.stats) return null;

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-accent)]/5 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {gym.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 font-hero tracking-tighter">
                <StatCounter stat={stat} />
              </div>
              <div className="h-1 w-12 bg-[var(--color-accent)] mx-auto mb-4 rounded-full" />
              <div className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
