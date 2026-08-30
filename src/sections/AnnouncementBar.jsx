import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';
import { useGym } from '../context/GymContext';

const AnnouncementBar = () => {
  const { gym } = useGym();
  const [isVisible, setIsVisible] = useState(true);

  if (!gym?.announcement || !gym.announcement.enabled || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="text-white relative z-50 overflow-hidden"
          style={{ background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)' }}
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-center relative text-sm font-medium">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 animate-bounce" />
              <span>{gym.announcement.text}</span>
              {gym.announcement.link && (
                <a href={gym.announcement.link} className="underline font-bold ml-1 hover:text-white/80 transition-colors">
                  {gym.announcement.linkText || 'Learn More'}
                </a>
              )}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 p-1 hover:bg-black/20 rounded-full transition-colors"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
