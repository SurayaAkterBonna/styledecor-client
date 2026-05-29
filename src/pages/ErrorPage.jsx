import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#121212] border border-white/5 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="text-4xl font-serif text-[#D4AF37]">404</div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-white tracking-wide">
            Spatial Coordinate Lost
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
            {error?.statusText || error?.message || "The architectural configuration layout you requested does not exist or has shifted locations."}
          </p>
        </div>

        <div className="pt-2">
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-[#D4AF37] hover:bg-[#AA771C] text-black font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-300"
          >
            Return to Gallery Base
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;