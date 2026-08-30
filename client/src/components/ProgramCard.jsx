import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Flame, TrendingDown, User, Zap, Activity, Trophy, Heart, Clock } from 'lucide-react';

const iconMap = {
  Dumbbell, Flame, TrendingDown, User, Zap, Activity, Trophy, Heart
};

const ProgramCard = ({ program }) => {
  const IconComponent = iconMap[program.icon] || Dumbbell;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-surface-dark border border-white/5 rounded-2xl p-6 hover:border-accent/50 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <IconComponent className="w-32 h-32 text-white" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
          <IconComponent className="w-7 h-7" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 font-heading">{program.name}</h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm font-medium">
          <span className="bg-white/5 text-gray-300 px-3 py-1 rounded-full flex items-center gap-1">
             <Activity className="w-4 h-4 text-accent"/> {program.difficulty}
          </span>
          <span className="bg-white/5 text-gray-300 px-3 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-4 h-4 text-accent"/> {program.duration}
          </span>
        </div>

        <p className="text-gray-400 mb-8 flex-grow">
          {program.description}
        </p>

        <a href="#contact" className="inline-flex items-center font-semibold text-accent group/btn w-fit">
          Learn More
          <motion.span
            className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        </a>
      </div>
    </motion.div>
  );
};

export default ProgramCard;
