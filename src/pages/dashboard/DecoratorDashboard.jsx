
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DashboardStatCard from '../../components/DashboardStatCard';
import { toast } from 'react-toastify';

const DecoratorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Specialist Profile Application Fields Strings State
  const [specialty, setSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  const fetchDecoratorWorkspace = async () => {
    setLoading(true);
    try {
      const profileRes = await axiosSecure.get(`/decorators/profile?email=${user.email}`);
      setProfile(profileRes.data);
      
      if (profileRes.data && profileRes.data.status === 'approved') {
        const tasksRes = await axiosSecure.get(`/bookings/decorator?email=${user.email}`);
        setTasks(tasksRes.data);
      }
    } catch (err) {
      console.error("Specialist context data build extraction error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchDecoratorWorkspace();
  }, [user]);

  const handleRegisterProfile = async (e) => {
    e.preventDefault();
    const applicationPayload = {
      decoratorEmail: user.email,
      name: user.displayName || 'Specialist Designer',
      specialty,
      experienceYears: parseInt(experienceYears, 10),
      portfolioLink,
      status: 'pending'
    };

    try {
      const res = await axiosSecure.post('/decorators', applicationPayload);
      toast.success('Technical execution profile logged for admin review.');
      setProfile(res.data);
    } catch (err) {
      toast.error('Failed to submit decorator credentials data model.');
    }
  };

  const handleUpdateStatus = async (bookingId, targetStatus) => {
    try {
      await axiosSecure.patch(`/bookings/status/${bookingId}`, { status: targetStatus });
      toast.success('Operational phase tag modified smoothly.');
      setTasks(tasks.map(t => t._id === bookingId ? { ...t, status: targetStatus } : t));
    } catch (err) {
      toast.error('Failed to push phase string status update.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner text-[#D4AF37]"></span>
    </div>
  );

  // State branch configuration view 1: User holds role but has not registered a profile document entity
  if (!profile) return (
    <div className="max-w-xl mx-auto p-6 sm:p-12 bg-[#121212] border border-white/5 rounded-2xl shadow-2xl my-12 space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-wide">Onboard Specialist Credentials</h2>
        <p className="text-xs text-gray-400 mt-1">Submit your technical expertise specifications to unlock the administrative task routing grid lines.</p>
      </div>

      <form onSubmit={handleRegisterProfile} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-gray-400">Design Specialty Focus Core</label>
          <input type="text" required placeholder="e.g., Luxury Ambient Lighting, Smart System Overlays" className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-gray-400">Years of Field Experience</label>
          <input type="number" required placeholder="e.g., 5" className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-gray-400">Digital Portfolio System Link URL</label>
          <input type="url" required placeholder="https://bechance.net/yourprofile" className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]" value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} />
        </div>
        <button type="submit" className="w-full btn btn-gold py-2.5 rounded-lg text-xs font-bold font-sans">Submit Authorization Credentials</button>
      </form>
    </div>
  );

  // State branch configuration view 2: Profile documented, but status flag remains pending authorization
  if (profile.status === 'pending') return (
    <div className="max-w-md mx-auto text-center p-8 bg-[#121212] border border-[#D4AF37]/20 rounded-2xl my-24 space-y-4 shadow-2xl">
      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-xl text-[#D4AF37] mx-auto animate-pulse">⏳</div>
      <h3 className="text-lg font-serif font-bold text-white">Credentials Verification Pending</h3>
      <p className="text-xs text-gray-400 leading-relaxed">Your professional background document model is safely loaded into the processing queue. System supervisors will authorize your node shortly.</p>
    </div>
  );

  // State branch configuration view 3: Fully authorized coordinator. View active layout assignments
  return (
    <div className="space-y-10 p-4 sm:p-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">Specialist Task Execution Matrix</h2>
        <p className="text-xs text-gray-400">Track and update active on-site structural adjustments for your assigned zones.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardStatCard title="Assigned Target Tasks" value={tasks.length} description="Total layout pipelines assigned" icon="🛠️" />
        <DashboardStatCard title="In-situ Active Setups" value={tasks.filter(t => t.status === 'in-progress').length} description="Physical installations currently running" icon="⚡" />
        <DashboardStatCard title="Completed Handovers" value={tasks.filter(t => t.status === 'completed').length} description="Successfully cleared setups completed" icon="✓" />
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-2xl space-y-4">
        <h3 className="text-sm font-bold tracking-wider uppercase text-gray-400 font-sans">Your Live Structural Routing Pipelines</h3>
        
        {tasks.length === 0 ? (
          <p className="text-xs text-gray-500 py-6 text-center">No assigned build zone arrays mapped to your node coordinates currently.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-xs text-gray-300">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 pl-0">Build Zone Target</th>
                  <th>Client Profile Info</th>
                  <th>Target Schedule</th>
                  <th>Directives Matrix Notes</th>
                  <th className="text-right">Shift Project Phase</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(t => (
                  <tr key={t._id} className="border-b border-white/5 hover:bg-white/[0.01]">
                    <td className="py-4 pl-0 font-medium text-white">{t.service_name}</td>
                    <td><p className="text-white font-medium">{t.userName}</p><p className="text-[10px] text-gray-500">{t.userEmail}</p></td>
                    <td className="font-mono text-gray-400">{t.scheduleDate}</td>
                    <td className="max-w-[180px] truncate text-gray-400 italic" title={t.customNotes}>{t.customNotes || 'No custom constraints flagged.'}</td>
                    <td className="text-right">
                      <select
                        className="bg-[#181818] border border-white/10 text-[11px] text-[#D4AF37] rounded p-1 font-medium"
                        value={t.status}
                        onChange={(e) => handleUpdateStatus(t._id, e.target.value)}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoratorDashboard;