
import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DashboardStatCard from '../../components/DashboardStatCard';
import RevenueChart from '../../components/RevenueChart';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fireDataRequests = async () => {
      try {
        const [statsRes, usersRes, decoratorsRes, bookingsRes] = await Promise.all([
          axiosSecure.get('/admin-stats'),
          axiosSecure.get('/users'),
          axiosSecure.get('/decorators'),
          axiosSecure.get('/bookings')
        ]);
        
        setAnalytics(statsRes.data);
        setUsers(usersRes.data);
        setDecorators(decoratorsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Global admin matrix hydration error:", err);
        toast.error("Failed to map system-wide metrics arrays.");
      } finally {
        setLoading(false);
      }
    };
    fireDataRequests();
  }, [axiosSecure]);

  const handleUpdateRole = async (userId, targetRole) => {
    try {
      await axiosSecure.patch(`/users/role/${userId}`, { role: targetRole });
      toast.success('System security level remapped.');
      // Hot reload state logic mapping changes instantly
      setUsers(users.map(u => u._id === userId ? { ...u, role: targetRole } : u));
    } catch (err) {
      toast.error('Failed to change authorization matrix values.');
    }
  };

  const handleApproveDecorator = async (decoratorId) => {
    try {
      await axiosSecure.patch(`/decorators/approve/${decoratorId}`);
      toast.success('Decorator assigned active operational standing.');
      setDecorators(decorators.map(d => d._id === decoratorId ? { ...d, status: 'approved' } : d));
    } catch (err) {
      toast.error('Failed to register active flag parameters.');
    }
  };

  const handleAssignDecorator = async (bookingId, decoratorEmail) => {
    try {
      await axiosSecure.patch(`/bookings/assign/${bookingId}`, { decoratorEmail });
      toast.success('Specialist routed to build zone coordinate pipeline.');
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, assignedDecorator: decoratorEmail, status: 'confirmed' } : b));
    } catch (err) {
      toast.error('Assignment rejected by processing engine.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner text-[#D4AF37]"></span>
    </div>
  );

  return (
    <div className="space-y-12 p-4 sm:p-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">Command Center Administrative Matrix</h2>
        <p className="text-xs text-gray-400">Maintain security clearance hierarchies, map resource groups, and monitor system performance indicators.</p>
      </div>

      {/* Numerical Performance Array Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatCard title="System Ledger Yield" value={`${analytics?.revenue?.toLocaleString() || 0} BDT`} description="Gross authorized revenue pipeline" icon="💰" />
        <DashboardStatCard title="Total Registered Nodes" value={analytics?.totalUsers || 0} description="User profile models logged" icon="👥" />
        <DashboardStatCard title="Staging Orders Handled" value={analytics?.totalBookings || 0} description="Gross structural events processed" icon="📋" />
        <DashboardStatCard title="Specialist Roster Volume" value={decorators.length} description="Verified field technicians active" icon="🛠️" />
      </div>

      {/* Advanced Custom Native Chart Element Box */}
      <RevenueChart servicesData={analytics?.servicesBreakdown || []} />

      {/* Active Workspace Splitting Layout Grids */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Module A: Global User Management Framework Table */}
        <div className="bg-[#121212] border border-white/5 rounded-xl p-5 shadow-xl space-y-4 max-h-[450px] overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Identities Security Clearance Registry</h3>
          <table className="table w-full text-xs text-gray-300">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase">
                <th className="pl-0">Identity</th>
                <th>Current Status Clearance</th>
                <th className="text-right">Remap Clearance</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-white/5">
                  <td className="pl-0 py-2"><p className="text-white font-medium truncate max-w-[140px]">{u.name}</p><p className="text-[10px] text-gray-500 truncate max-w-[140px]">{u.email}</p></td>
                  <td><span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-xs rounded text-gray-300 uppercase font-mono">{u.role}</span></td>
                  <td className="text-right">
                    <select 
                      className="bg-[#181818] border border-white/10 text-[11px] text-[#D4AF37] rounded px-1 py-0.5"
                      value={u.role}
                      onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="decorator">Decorator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Module B: Specialty Vendor Validation Logs Table */}
        <div className="bg-[#121212] border border-white/5 rounded-xl p-5 shadow-xl space-y-4 max-h-[450px] overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Specialist Vendor Verification Pipeline</h3>
          <table className="table w-full text-xs text-gray-300">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase">
                <th className="pl-0">Specialist Candidate</th>
                <th>Experience Baseline</th>
                <th className="text-right">Authorize Standing</th>
              </tr>
            </thead>
            <tbody>
              {decorators.map(d => (
                <tr key={d._id} className="border-b border-white/5">
                  <td className="pl-0 py-2"><p className="text-white font-medium">{d.name || d.decoratorEmail}</p><p className="text-[10px] text-gray-500">{d.specialty}</p></td>
                  <td className="font-mono text-gray-400">{d.experienceYears} Years</td>
                  <td className="text-right">
                    {d.status === 'pending' ? (
                      <button onClick={() => handleApproveDecorator(d._id)} className="btn btn-[10px] h-auto min-h-0 bg-[#D4AF37] hover:bg-[#AA771C] text-black font-bold px-2 py-1 rounded">Approve</button>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wide text-green-400 font-bold">Active Standing</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Module C: Unified Task Dispatch & Routing Matrix Panel */}
      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold tracking-wider uppercase text-gray-400">Global Structural Dispatch Routing Console</h3>
        <div className="overflow-x-auto">
          <table className="table w-full text-xs text-gray-300">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 pl-0">Installation Project Target</th>
                <th>Client User Profile</th>
                <th>Scheduled Date</th>
                <th>Assigned Specialist Node</th>
                <th className="text-right">Re-route Vector</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id} className="border-b border-white/5">
                  <td className="py-4 pl-0 font-medium text-white">{b.service_name}</td>
                  <td>{b.userEmail}</td>
                  <td className="font-mono text-gray-400">{b.scheduleDate}</td>
                  <td>
                    <span className={`text-[11px] font-mono ${b.assignedDecorator ? 'text-[#D4AF37]' : 'text-red-400 italic'}`}>
                      {b.assignedDecorator || 'Unassigned Queue'}
                    </span>
                  </td>
                  <td className="text-right">
                    <select
                      className="bg-[#181818] border border-white/10 text-[11px] text-white rounded p-1"
                      value={b.assignedDecorator || ''}
                      onChange={(e) => handleAssignDecorator(b._id, e.target.value)}
                    >
                      <option value="" disabled>Select Specialist</option>
                      {decorators.filter(d => d.status === 'approved').map(d => (
                        <option key={d._id} value={d.decoratorEmail}>{d.name || d.decoratorEmail}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;