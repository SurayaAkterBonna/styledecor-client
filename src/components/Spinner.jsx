import React from 'react';

const Spinner = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#D4AF37]/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] font-medium text-gray-500 font-sans animate-pulse">
        Calibrating Canvas...
      </p>
    </div>
  );
};

export default Spinner;