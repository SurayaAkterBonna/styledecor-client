import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import CoverageMap from './pages/CoverageMap';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DecoratorDashboard from './pages/dashboard/DecoratorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:id', element: <ServiceDetails /> },
      { path: 'coverage', element: <CoverageMap /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: 'dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      { path: 'user', element: <UserDashboard /> },
      { path: 'decorator', element: <DecoratorDashboard /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: '', element: <Navigate to="user" replace /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);