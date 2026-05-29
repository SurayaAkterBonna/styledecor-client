import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fallBackPhoto = photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde';

    try {
      // 1. Instantiation at Firebase node core
      const result = await createUser(email, password);
      
      // 2. Map Profile elements locally
      await updateUserProfile(name, fallBackPhoto);

      // 3. Register user metadata safely to the remote MongoDB collection
      const userPayload = {
        name,
        email,
        image: fallBackPhoto,
        role: 'user',
        status: 'active'
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/users`, userPayload);
      
      toast.success('Registration successful. Welcome to StyleDecor!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration structural failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-serif text-white tracking-wide">Client Registration</h2>
          <p className="text-xs text-gray-500">Establish your private system configuration node.</p>
        </div>

        <form onSubmit={handleRegistration} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-gray-400">Full Structural Name</label>
            <input 
              type="text" required
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-gray-400">Email Address</label>
            <input 
              type="email" required
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-gray-400">Avatar Image Link URL (Optional)</label>
            <input 
              type="url"
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-gray-400">Security Password</label>
            <input 
              type="password" required
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn btn-gold py-2.5 rounded-lg text-xs font-bold">
            {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Establish Account Profile'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already registered? <Link to="/login" className="text-[#D4AF37] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;