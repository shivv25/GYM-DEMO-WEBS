import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Play, Activity } from 'lucide-react';
import { useGym } from '../context/GymContext';

const Hero = () => {
  const { gym } = useGym();
  const [imgError, setImgError] = useState(false);

  if (!gym?.hero) return null;

  const { hero, stats } = gym;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-dark text-white">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 pointer-events-none" style={{ background: 'var(--color-accent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
      
      <div className="section-container relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[70vh]">
          
          {/* Left Content */}
          <motion.div 
            className="w-full lg:w-[58%] flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            {hero.badge && (
              <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-accent)', boxShadow: '0 0 10px var(--color-accent)' }} />
                <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{hero.badge}</span>
              </motion.div>
            )}

            {/* Heading */}
            <motion.h1 variants={itemVariants} className="font-heading text-hero uppercase leading-[0.95] mb-8 tracking-tight">
              {hero.heading?.map((line, index) => (
                <div key={index} className={index === hero.accentLine ? 'drop-shadow-lg' : 'text-white'} style={index === hero.accentLine ? { color: 'var(--color-accent)' } : {}}>
                  {line}
                </div>
              ))}
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed font-light">
              {hero.subheading}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
              <a 
                href={hero.primaryCTA?.link || '#trial'} 
                className="btn-primary rounded-lg group text-base"
              >
                {hero.primaryCTA?.text || 'START TRAINING'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </a>
              <a 
                href={hero.secondaryCTA?.link || '#programs'} 
                className="btn-outline rounded-lg group text-base"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                {hero.secondaryCTA?.text || 'VIEW PROGRAMS'}
              </a>
            </motion.div>

            {/* Review Badge */}
            {hero.reviewBadge && (
              <motion.div variants={itemVariants} className="flex items-center gap-4 glass p-3 pr-6 rounded-2xl">
                <div className="flex -space-x-2.5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] overflow-hidden bg-dark-50">
                      <img 
                        src={`https://i.pravatar.cc/80?img=${i+10}`} 
                        alt="Member" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1" style={{ color: 'var(--color-accent)' }}>
                    {Array.from({ length: hero.reviewBadge.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    {hero.reviewBadge.text}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Content — Hero Image */}
          <motion.div 
            className="w-full lg:w-[42%] relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              {/* Image gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 to-transparent z-10" />
              
              {!imgError ? (
                <img 
                  src={hero.image}
                  alt={`${gym.name} - Premium Fitness`}
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[1.5s]"
                  onError={() => setImgError(true)}
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-dark-100 to-dark-500 flex items-center justify-center">
                  <Activity className="w-20 h-20 text-white/10" />
                </div>
              )}
            </div>
            

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
