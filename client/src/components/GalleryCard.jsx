import React from 'react';
import { motion } from 'framer-motion';

const GalleryCard = ({ item }) => {
  return (
    <motion.div 
      className="relative group rounded-xl overflow-hidden aspect-square border border-white/10 bg-surface-dark"
      whileHover="hover"
    >
      {item.image ? (
        <img 
          src={item.image} 
          alt={item.caption || item.category} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }}
        />
      ) : null}
      
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark to-accent/20" style={{ display: item.image ? 'none' : 'block' }}></div>

      <div className="absolute inset-0 bg-bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
        <motion.span 
          variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 20, opacity: 0 } }}
          initial="initial"
          transition={{ duration: 0.3 }}
          className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
        >
          {item.category}
        </motion.span>
        
        {item.caption && (
          <motion.h3 
            variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 20, opacity: 0 } }}
            initial="initial"
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-white font-bold text-lg px-2"
          >
            {item.caption}
          </motion.h3>
        )}
      </div>
    </motion.div>
  );
};

export default GalleryCard;
