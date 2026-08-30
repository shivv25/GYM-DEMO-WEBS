import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800"
      >
        404
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl text-neutral-400 mt-4 mb-8 text-center"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          to="/" 
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all uppercase tracking-wider"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
