import React from 'react';

const SectionHeader = ({ title, subtitle, center = true }) => {
  return (
    <div className={`space-y-2 mb-12 ${center ? 'text-center' : 'text-left'}`}>
      <span className="text-[10px] tracking-[0.3em] font-bold text-gradient uppercase bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#F3E5AB] bg-clip-text text-transparent">
        {subtitle}
      </span>
      <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-wide">
        {title}
      </h2>
      <div className={`w-12 h-[2px] bg-gradient-to-r from-[#AA771C] to-[#F3E5AB] mt-3 ${center ? 'mx-auto' : 'ml-0'}`}></div>
    </div>
  );
};

export default SectionHeader;