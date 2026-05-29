import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#070707] border-t border-white/5 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <span className="text-2xl font-bold tracking-wider text-gold-gradient font-serif">STYLE<span className="text-white">DECOR</span></span>
          <p className="text-sm leading-relaxed">
            Crafting luxury atmospheres, smart home system automation overlays, and premium ceremony sets for modern local experiences.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Business Hours</h4>
          <ul className="space-y-2 text-sm">
            <li>Saturday - Thursday</li>
            <li className="text-[#D4AF37]">09:00 AM - 08:00 PM</li>
            <li className="text-gray-500">Friday (Closed)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-[#D4AF37] transition-colors">All Packages</Link></li>
            <li><Link to="/coverage" className="hover:text-[#D4AF37] transition-colors">Service Map Area</Link></li>
            <li><Link to="/login" className="hover:text-[#D4AF37] transition-colors">Client Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Contact Concierge</h4>
          <ul className="space-y-2 text-sm">
            <li>Gulshan Avenue, Block SE(C), Dhaka</li>
            <li>+880 1712-345678</li>
            <li className="hover:text-[#D4AF37] truncate">concierge@styledecor.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>&copy; 2026 StyleDecor Inc. All rights reserved globally.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Facebook</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Pinterest</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;