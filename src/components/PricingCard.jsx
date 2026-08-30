import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Button from './Button';

const PricingCard = ({ plan }) => {
  const isPopular = plan.isPopular;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative bg-surface-dark rounded-3xl p-8 flex flex-col h-full border transition-all duration-300 ${
        isPopular ? 'border-accent shadow-2xl shadow-accent/10 md:scale-105 z-10' : 'border-white/10 hover:border-white/30'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
          Most Popular
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2 font-heading">{plan.name}</h3>
        <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-black text-white font-heading">{plan.currency || '₹'}{plan.price}</span>
          <span className="text-gray-400">/{plan.period}</span>
        </div>
      </div>

      <div className="flex-grow flex flex-col gap-4 mb-8">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            {feature.included ? (
              <div className="mt-0.5 rounded-full bg-accent/20 p-1">
                <Check className="w-4 h-4 text-accent" />
              </div>
            ) : (
              <div className="mt-0.5 rounded-full bg-white/5 p-1">
                <X className="w-4 h-4 text-gray-500" />
              </div>
            )}
            <span className={feature.included ? 'text-gray-300' : 'text-gray-500 line-through'}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant={isPopular ? 'primary' : 'outline'}
        className="w-full"
        href="#contact"
      >
        Explore More
      </Button>
    </motion.div>
  );
};

export default PricingCard;
