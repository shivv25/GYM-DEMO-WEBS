import React from 'react';

const SectionHeading = ({ title, subtitle, badge, align = 'center', className = '' }) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  };

  return (
    <div className={`flex flex-col ${alignClasses[align]} mb-12 ${className}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm tracking-wider uppercase mb-4 border border-accent/20">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 relative">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl text-lg mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
