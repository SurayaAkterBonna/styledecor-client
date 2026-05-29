import { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  signInWithPopup, 
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('user');
  const [accountStatus, setAccountStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        try {
          const roleResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${currentUser.email}`);
          setRole(roleResponse.data.role);
          setAccountStatus(roleResponse.data.status);

          const tokenResponse = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser.email });
          localStorage.setItem('access-token', tokenResponse.data.token);
        } catch (error) {
          console.error(error);
        }
      } else {
        localStorage.removeItem('access-token');
        setRole('user');
        setAccountStatus(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    accountStatus,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};