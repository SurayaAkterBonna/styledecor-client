
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DashboardStatCard from '../../components/DashboardStatCard';
import CheckoutForm from '../../components/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State elements to process payments safely inline via modular overlay structures
  const [activePaymentTarget, setActivePaymentTarget] = useState(null);

  const fetchUserLogs = () => {
    setLoading(true);
    axiosSecure.get(`/bookings/client?email=${user.email}`)
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Client side database collection mapping error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) fetchUserLogs();
  }, [user]);

  // Aggregate processing analytics data counts
  const totalSpent = bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, item) => sum + item.cost, 0);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const activeBuilds = bookings.filter(b => b.status === 'confirmed' || b.status === 'in-progress').length;

  return (
    <div className="space-y-10 p-4 sm:p-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">Client Portal Dashboard</h2>
        <p className="text-xs text-gray-400">Review real-time status arrays for your operational project orders.</p>
      </div>

      {/* Numerical Data Metric Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardStatCard title="Settled Design Capital" value={`${totalSpent.toLocaleString()} BDT`} description="Total investments processed cleanly" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <DashboardStatCard title="Pending Verifications" value={pendingCount} description="Awaiting architectural verification profiles" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <DashboardStatCard title="Active Installations" value={activeBuilds} description="Active styling setups running in-situ" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
      </div>

      {/* Main Reservation Matrix Layout */}
      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-2xl space-y-4">
        <h3 className="text-sm font-bold tracking-wider uppercase text-gray-400">Your Design Orders</h3>
        
        {loading ? (
          <div className="flex justify-center py-12"><span className="loading loading-spinner text-[#D4AF37]"></span></div>
        ) : bookings.length === 0 ? (
          <p className="text-xs text-gray-500 py-6 text-center">No structural reservation layers generated under this identity yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-xs text-gray-300">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 pl-0">Package Target</th>
                  <th>Execution Window</th>
                  <th>Build Status</th>
                  <th>Finances</th>
                  <th className="text-right">Action Interface</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => (
                  <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.01]">
                    <td className="py-4 pl-0 font-medium text-white">{item.service_name}</td>
                    <td className="font-mono text-gray-400">{item.scheduleDate}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                        item.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="text-right">
                      {item.paymentStatus === 'unpaid' ? (
                        <button 
                          onClick={() => setActivePaymentTarget(item)}
                          className="btn btn-xs rounded bg-[#D4AF37] hover:bg-[#AA771C] text-black font-bold px-3"
                        >
                          Clear Dues
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-gray-500">Transaction Finalized</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stripe Payment Integration Modal Window Overlay */}
      {activePaymentTarget && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 relative space-y-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-white">Authorize Gateway Payment</h3>
              <p className="text-xs text-gray-400 mt-1">Clearing balances for: <span className="text-white font-medium">{activePaymentTarget.service_name}</span></p>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm 
                booking={activePaymentTarget} 
                onSuccess={() => {
                  setActivePaymentTarget(null);
                  fetchUserLogs();
                }} 
              />
            </Elements>

            <button 
              onClick={() => setActivePaymentTarget(null)}
              className="absolute top-2 right-4 text-gray-500 hover:text-white text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;