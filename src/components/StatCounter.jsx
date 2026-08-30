import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const useCountUp = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return { count, ref };
};

const StatCounter = ({ stat }) => {
  const { count, ref } = useCountUp(stat.value);

  return (
    <div ref={ref} className="text-center p-6 border border-white/5 rounded-2xl bg-surface-dark hover:border-accent/30 transition-colors">
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <span className="text-5xl md:text-6xl font-black font-heading text-white">
          {count}
        </span>
        {stat.suffix && (
          <span className="text-3xl font-bold text-accent">{stat.suffix}</span>
        )}
      </div>
      <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">
        {stat.label}
      </p>
    </div>
  );
};

export default StatCounter;
