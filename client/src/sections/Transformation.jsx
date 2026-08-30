import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { useGym } from '../context/GymContext';
import StatCounter from '../components/StatCounter';

const Transformation = () => {
  const { gym } = useGym();
  
  if (!gym?.transformation) return null;
  const { transformation } = gym;

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-hero uppercase font-black mb-8 leading-tight">
              {transformation.heading || "Real People, Real Results."}
            </h2>
            
            <div className="relative mb-12">
              <Quote className="absolute -top-6 -left-6 w-12 h-12 text-[var(--color-accent)] opacity-20" />
              <p className="text-xl md:text-2xl text-gray-300 italic relative z-10 font-light leading-relaxed">
                "{transformation.quote || "Joining this gym was the best decision of my life. The trainers are exceptional and the community is incredibly supportive."}"
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={transformation.authorImage || "https://i.pravatar.cc/150?img=32"} alt="Member" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold">{transformation.author || "Sarah Jenkins"}</div>
                  <div className="text-sm text-[var(--color-accent)]">{transformation.authorTitle || "Lost 30lbs in 6 months"}</div>
                </div>
              </div>
            </div>

            {transformation.stats && (
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                {transformation.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-4xl font-black text-white font-heading mb-2">
                      <StatCounter stat={stat} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button className="mt-12 group flex items-center gap-2 text-[var(--color-accent)] font-bold hover:text-white transition-colors">
              <span>View More Success Stories</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={transformation.image || "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop"} 
                alt="Transformation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 z-20 flex gap-4">
                <div className="bg-black/50 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-center">
                  <div className="text-xs text-gray-300 uppercase tracking-wider mb-1">Before</div>
                  <div className="font-bold">185 lbs</div>
                </div>
                <div className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-center shadow-lg">
                  <div className="text-xs text-white/80 uppercase tracking-wider mb-1">After</div>
                  <div className="font-bold">155 lbs</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Transformation;
