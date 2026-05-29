import React from 'react';
import { Link } from 'react-router-dom';
import useServices from '../hooks/useServices';
import ServiceCard from '../components/ServiceCard';
import SectionHeader from '../components/SectionHeader';

const Home = () => {
  const { services, loading } = useServices();
  const premiumShowcase = services.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Banner Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center bg-black overflow-hidden px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]"></div>
        <div className="relative z-10 max-w-4xl text-center space-y-6">
          <span className="text-[11px] tracking-[0.4em] font-bold text-[#D4AF37] uppercase">
            Exquisite Spaces • Tailored Atmospheres
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif text-white tracking-wide leading-tight">
            Elevate Your Surroundings into <span className="text-gradient bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#F3E5AB] bg-clip-text text-transparent">Fine Art</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-light">
            Providing custom spatial styling, automated luxury smart overlays, and curated ceremony backdrops engineered for contemporary environments.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services" className="w-full sm:w-auto btn btn-gold rounded-lg px-8 py-3">
              Explore Collections
            </Link>
            <Link to="/coverage" className="w-full sm:w-auto btn btn-outline border-white/20 text-white hover:bg-white/5 rounded-lg px-8 py-3">
              View Service Network
            </Link>
          </div>
        </div>
      </div>

      {/* Brand Identity Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionHeader title="The Artistry Behind Our Method" subtitle="About StyleDecor" center={false} />
            <p className="text-gray-400 text-sm leading-relaxed">
              We focus on premium, detailed design elements. Our process transforms typical interior environments and ceremonial venues into memorable luxury spaces using carefully balanced textures, lighting, and materials.
            </p>
            <div className="border-l-2 border-[#D4AF37] pl-4 italic text-xs text-gray-300">
              "Design is not merely how an environment appears; it determines how a space connects with those within it."
            </div>
          </div>
          <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl space-y-4 shadow-xl">
            <h4 className="text-white font-serif text-lg font-bold">Core Design Solutions</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#181818] rounded-lg border border-[#D4AF37]/10"><span className="text-[#D4AF37] font-bold">01. Ceremonial Layouts:</span> Tailored installations for upscale private celebrations.</div>
              <div className="p-3 bg-[#181818] rounded-lg border border-white/5"><span className="text-[#D4AF37] font-bold">02. Automated Overlays:</span> Integration of ambient control nodes and dimming setups.</div>
              <div className="p-3 bg-[#181818] rounded-lg border border-white/5"><span className="text-[#D4AF37] font-bold">03. Custom Texturing:</span> Premium wall designs, drapes, and balance features.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Previews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Signature Service Experiences" subtitle="Curated Collections" />
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-md text-[#D4AF37]"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumShowcase.map(item => (
              <ServiceCard key={item._id} service={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;