import React from 'react';
import { Instagram, Twitter, Linkedin, Award } from 'lucide-react';

const TrainerCard = ({ trainer }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-surface-dark border border-white/5 h-[400px]">
      {trainer.image ? (
        <img 
          src={trainer.image} 
          alt={trainer.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'block';
          }}
        />
      ) : null}
      
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent w-full h-full" style={{ display: trainer.image ? 'none' : 'block' }}></div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full mb-3 backdrop-blur-sm border border-accent/30 flex items-center gap-1 w-fit">
            <Award className="w-3 h-3" /> {trainer.experience}
          </span>
          
          <h3 className="text-2xl font-bold font-heading text-white mb-1">{trainer.name}</h3>
          <p className="bg-accent text-white font-medium mb-4 px-2 py-1 w-fit">{trainer.role}</p>
          
          <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {trainer.specializations?.map((spec, i) => (
              <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                {spec}
              </span>
            ))}
          </div>

          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
