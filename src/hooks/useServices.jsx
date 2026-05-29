import { useState, useEffect } from 'react';
import axios from 'axios';

const useServices = (filters = {}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search = '', category = 'all', minPrice = '', maxPrice = '' } = filters;

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (category && category !== 'all') queryParams.append('category', category);
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services?${queryParams.toString()}`);
        setServices(response.data);
        setError(null);
      } catch (err) {
        console.error("Error synchronizing package arrays:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    
    const handler = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(handler);
  }, [search, category, minPrice, maxPrice]);

  return { services, loading, error };
};

export default useServices;