import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
  const brands = [
    "Men's Health", "Nike", "Under Armour", "Gymshark", "Rogue Fitness"
  ];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">
          Trusted by top fitness brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-xl md:text-2xl font-black font-hero uppercase text-white opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
