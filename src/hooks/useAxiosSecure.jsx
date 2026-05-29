import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor to append Authorization Token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor to handle auth exceptions (401, 403)
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.warn("Authorization breach captured by interceptor. Initiating reset.");
          await logoutUser();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;