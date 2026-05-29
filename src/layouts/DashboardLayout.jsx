import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardLayout = () => {
  const { loading } = useContext(AuthContext);
  const { currentRole, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Spinner />;
  }

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B]">
      <Navbar />
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="mb-6 border-b border-white/5 pb-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
              {currentRole} Panel
            </span>
          </div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;