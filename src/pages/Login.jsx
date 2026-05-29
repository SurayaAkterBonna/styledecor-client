import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || '/dashboard';

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success('Welcome back to StyleDecor');
      navigate(destination, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid identification strings provided.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuth = async () => {
    try {
      await googleLogin();
      toast.success('OAuth validation verified.');
      navigate(destination, { replace: true });
    } catch (err) {
      toast.error('OAuth connection dropped.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-serif text-white tracking-wide">Client Portal Entry</h2>
          <p className="text-xs text-gray-500">Access your design dashboards and scheduling logs.</p>
        </div>

        <form onSubmit={handleFormLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-gray-400">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-gray-400">Security Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn btn-gold py-2.5 rounded-lg text-xs font-bold">
            {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Authenticate Connection'}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 w-full h-[1px] bg-white/5"></div>
          <span className="relative z-10 bg-[#121212] px-3 text-[10px] text-gray-500 uppercase font-medium">Or Context Connect</span>
        </div>

        <button onClick={handleGoogleOAuth} className="w-full btn btn-outline border-white/10 text-white hover:bg-white/5 py-2.5 rounded-lg text-xs flex items-center justify-center space-x-2">
          <span>Authorize via Google Account</span>
        </button>

        <p className="text-center text-xs text-gray-500">
          New client? <Link to="/register" className="text-[#D4AF37] hover:underline">Register account profile</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;