import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, role, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="navbar bg-[#0B0B0B]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 px-4 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-[#D4AF37]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-[#121212] border border-white/10 rounded-xl w-52 text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/coverage">Coverage Map</Link></li>
          </ul>
        </div>
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-wider text-gold-gradient font-serif">STYLE<span className="text-white">DECOR</span></span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 text-sm font-medium text-gray-300">
          <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
          <li><Link to="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link></li>
          <li><Link to="/coverage" className="hover:text-[#D4AF37] transition-colors">Coverage Map</Link></li>
        </ul>
      </div>

      <div className="navbar-end space-x-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'} alt="Profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-[#121212] border border-[#D4AF37]/20 rounded-xl w-60 space-y-2">
              <div className="px-2 py-1.5 border-b border-white/5 mb-1">
                <p className="text-sm font-semibold text-white truncate">{user.displayName || 'User'}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-gradient-to-r from-[#AA771C] to-[#D4AF37] text-black font-bold text-[10px] uppercase rounded">
                  {role}
                </span>
              </div>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-[#D4AF37]">Dashboard</Link></li>
              <li><button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-medium">Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm px-5 rounded-lg btn-gold">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;