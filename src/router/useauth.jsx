import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../backend/config/fire';


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // console.log('Auth state changed. User:', user);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log('User state changed. New user:', user);
      setUser(user);
      setLoading(false);
    });
  
    return () => {
      // console.log('Cleaning up auth state listener.');
      unsubscribe();
    };
  }, []);
  return { user, loading };
};