import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { _id, service_name, cost, unit, service_category, description, image } = service;

  return (
    <div className="bg-[#121212] border-gold-glow rounded-xl overflow-hidden shadow-xl flex flex-col h-full group">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img 
          src={image || 'https://images.unsplash.com/photo-1519741497674-611481863552'} 
          alt={service_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] tracking-widest uppercase px-2.5 py-1 rounded font-bold">
          {service_category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <h3 className="text-lg font-bold text-white tracking-wide font-serif line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
          {service_name}
        </h3>
        
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>
        
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-white font-serif">{cost.toLocaleString()} BDT</span>
            <span className="text-[10px] text-gray-500 ml-1 block uppercase font-medium">{unit}</span>
          </div>
          <Link to={`/services/${_id}`} className="btn btn-xs rounded bg-[#1A1A1A] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-gold-ombre hover:text-black font-semibold transition-all">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;