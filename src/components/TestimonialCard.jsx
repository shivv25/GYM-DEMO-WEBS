import React from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 relative flex flex-col h-full">
      <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
      
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
          />
        ))}
      </div>

      <p className="text-gray-300 italic mb-8 flex-grow text-lg">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-bg-dark border-2 border-accent">
          {testimonial.image ? (
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-accent">
              {testimonial.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-white font-heading">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
