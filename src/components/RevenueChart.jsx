import React from 'react';

const RevenueChart = ({ servicesData = [] }) => {
  const maxCount = Math.max(...servicesData.map(s => s.count || 1), 1);

  return (
    <div className="space-y-6 bg-[#161616] p-6 rounded-xl border border-white/5">
      <h4 className="text-sm font-bold tracking-wider uppercase text-gray-400">
        Package Sales Volume Profile
      </h4>
      {servicesData.length === 0 ? (
        <p className="text-xs text-gray-500 py-6">No historical orders mapped to visualize yet.</p>
      ) : (
        <div className="space-y-4 pt-2">
          {servicesData.map((item, index) => {
            const percentage = ((item.count / maxCount) * 100).toFixed(0);
            return (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-white truncate max-w-[70%]">{item._id}</span>
                  <span className="text-[#D4AF37] font-mono">{item.count} Bookings</span>
                </div>
                <div className="w-full h-3 bg-[#0B0B0B] rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#F3E5AB] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RevenueChart;