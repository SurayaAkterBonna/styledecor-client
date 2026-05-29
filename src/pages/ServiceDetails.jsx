import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import SectionHeader from '../components/SectionHeader';

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form Reservation State Strings
  const [scheduleDate, setScheduleDate] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`)
      .then(res => {
        setService(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Single target array pull error:", err);
        toast.error("Failed to extract target layout profile specs.");
        setLoading(false);
      });
  }, [id]);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Please sign in to log a reservation sequence.");
      return navigate('/login');
    }

    setSubmitting(true);

    const bookingPayload = {
      serviceId: service._id,
      service_name: service.service_name,
      cost: service.cost,
      userEmail: user.email,
      userName: user.displayName || 'Valued Client',
      scheduleDate,
      customNotes,
      status: 'pending',
      paymentStatus: 'unpaid',
      assignedDecorator: null
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingPayload, {
        headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
      });
      toast.success("Design reservation queued! View your client matrix tracker.");
      navigate('/dashboard');
    } catch (err) {
      console.error("Booking transactional execution error:", err);
      toast.error("Failed to commit reservation data arrays to pipeline.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-[#D4AF37]"></span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-12">
      <SectionHeader title={service?.service_name} subtitle={`${service?.service_category} Profile Specifications`} center={false} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Gallery / Visual Descriptions Element */}
        <div className="lg:col-span-2 space-y-6">
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl">
            <img 
              src={service?.image || 'https://images.unsplash.com/photo-1519741497674-611481863552'} 
              alt={service?.service_name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white font-serif tracking-wide">Aesthetic Scope & Deliverables</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{service?.description}</p>
            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#181818] rounded-xl"><span className="text-gray-500 block font-semibold uppercase text-[9px]">Base Assessment Cost</span><span className="text-white text-base font-black font-serif">{service?.cost?.toLocaleString()} BDT</span></div>
              <div className="p-3 bg-[#181818] rounded-xl"><span className="text-gray-500 block font-semibold uppercase text-[9px]">Billing Invoicing Unit</span><span className="text-[#D4AF37] font-medium">{service?.unit}</span></div>
            </div>
          </div>
        </div>

        {/* Dynamic Booking Reservation Interface Box */}
        <div className="bg-[#121212] border border-[#D4AF37]/20 shadow-2xl rounded-2xl p-6 space-y-6 lg:sticky lg:top-24">
          <div>
            <h4 className="text-white font-serif text-lg font-bold">Lock Design Coordinates</h4>
            <p className="text-xs text-gray-400">Queue an active scheduling log to pull decor specialists onto your build zone.</p>
          </div>

          <form onSubmit={handleCreateBooking} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold text-gray-400">Target Installation Date</label>
              <input 
                type="date" required
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold text-gray-400">Custom Architectural Directives</label>
              <textarea 
                rows="4"
                placeholder="Mention spatial constraints, structural dimensions, color configurations..."
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={submitting} 
              className="w-full btn btn-gold rounded-xl py-3 font-bold text-xs"
            >
              {submitting ? <span className="loading loading-spinner loading-xs"></span> : 'Submit Reservation Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;