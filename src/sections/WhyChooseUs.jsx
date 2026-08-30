import React from 'react';
import { motion } from 'framer-motion';
import { useGym } from '../context/GymContext';
import SectionHeading from '../components/SectionHeading';
import * as LucideIcons from 'lucide-react';

const WhyChooseUs = () => {
  const { gym } = useGym();
  
  if (!gym?.whyChooseUs) return null;

  const { whyChooseUs } = gym;

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Star;
  };

  return (
    <section className="py-24 md:py-32 bg-dark text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="section-container relative z-10">
        <SectionHeading 
          title={whyChooseUs.heading || "Why Choose Us"}
          subtitle={whyChooseUs.subheading || "Experience fitness on a whole new level."}
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {whyChooseUs.features?.map((feature, idx) => {
            const IconComponent = getIcon(feature.icon);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[var(--color-accent)]/30 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading tracking-wide uppercase">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
