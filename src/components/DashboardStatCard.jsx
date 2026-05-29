import React from 'react';

const DashboardStatCard = ({ title, value, icon, description }) => {
  return (
    <div className="bg-[#161616] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 rounded-xl p-6 flex items-start justify-between group shadow-xl">
      <div className="space-y-2">
        <p className="text-xs uppercase font-semibold tracking-wider text-gray-500 group-hover:text-gray-400 transition-colors">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight">
          {value}
        </h3>
        {description && (
          <p className="text-[11px] text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className="p-3 bg-[#1C1C1C] border border-white/5 text-[#D4AF37] rounded-lg group-hover:bg-gradient-to-r group-hover:from-[#AA771C] group-hover:to-[#D4AF37] group-hover:text-black transition-all duration-300">
        {icon}
      </div>
    </div>
  );
};

export default DashboardStatCard;