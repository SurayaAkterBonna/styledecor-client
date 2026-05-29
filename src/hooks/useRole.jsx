import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [currentRole, setCurrentRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user?.email) {
      setCurrentRole(null);
      setRoleLoading(false);
      return;
    }

    axiosSecure.get(`/users/role/${user.email}`)
      .then(res => {
        setCurrentRole(res.data.role);
        setRoleLoading(false);
      })
      .catch((err) => {
        console.error("Role verification network failure detail:", err.response || err);
        setCurrentRole('user');
        setRoleLoading(false);
      });
  }, [user, loading, axiosSecure]);

  return { currentRole, roleLoading };
};

export default useRole;