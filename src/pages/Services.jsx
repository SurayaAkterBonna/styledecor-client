import React, { useState } from 'react';
import useServices from '../hooks/useServices';
import ServiceCard from '../components/ServiceCard';
import SectionHeader from '../components/SectionHeader';

const Services = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { services, loading } = useServices({ search, category, minPrice, maxPrice });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-12">
      <SectionHeader title="Our Design & Staging Packages" subtitle="Curated Portfolios" />

      {/* Advanced Filtering Control Panel */}
      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Search Portfolio</label>
          <input 
            type="text" 
            placeholder="Search keywords..." 
            className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Category Core</label>
          <select 
            className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Portfolios</option>
            <option value="Ceremony">Ceremony Sets</option>
            <option value="Smart Home Overlay">Smart System Automation</option>
            <option value="Luxury Atmosphere">Ambient Spaces</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Floor Price (BDT)</label>
          <input 
            type="number" 
            placeholder="Min BDT" 
            className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Ceiling Price (BDT)</label>
          <input 
            type="number" 
            placeholder="Max BDT" 
            className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Service Output Grid */}
      {loading ? (
        <div className="flex justify-center py-24">
          <span className="loading loading-spinner loading-lg text-[#D4AF37]"></span>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-24 bg-[#121212] rounded-xl border border-white/5">
          <p className="text-sm text-gray-400">No design packages matches your active filter parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(item => (
            <ServiceCard key={item._id} service={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;