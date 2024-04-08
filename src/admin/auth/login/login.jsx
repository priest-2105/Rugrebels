import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../../../backend/config/fire';
import { collection, doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState(null);


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Check if the user document exists in the 'admins' collection
          const adminDocRef = doc(collection(db, 'admins'), user.uid);
          const adminDocSnapshot = await getDoc(adminDocRef);

          if (adminDocSnapshot.exists()) {
            // Admin document exists, get the user's name from the document
            const adminData = adminDocSnapshot.data();
            // console.log('Admin Data:', adminData);

          } else {
            toast.error('You are not an admin.');
            await auth.signOut(); // Sign out the user
          }
        } catch (error) {
          console.error('Error fetching admin data:', error.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
      }
    });

    return () => unsubscribe();
  }, []);

  
  
  const handleLogin = async () => {
    setIsLoggingIn(true);

    try {
      // Email exists, proceed with login
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        console.log('Please verify your email before logging in.');
        toast.warning('Please verify your email before logging in.');
        setIsLoggingIn(false);
        return;
      }

      // Check if the user document exists in the 'admins' collection
      const adminDocRef = doc(collection(db, 'admins'), userCredential.user.uid);
      const adminDoc = await getDoc(adminDocRef);

      if (!adminDoc.exists()) {
        // The user is not an admin
        toast.error('Account does not exist.');
        await auth.signOut();
        setIsLoggingIn(false);
        return;
      }

      // Redirect to the homepage
      navigate('/admin/dashboard');

      // Display success toast
      toast.success('Successfully logged in.');
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };




  return (
    <div>
      <div className="splash-container align-items-center " style={{ height: '100vh' }}>
        <div className="card mt-5">
          <div className="card-header text-center">
            <img height="70" width="80" src="/vendors/img/GVlcP7P9rVgB-yYuv8KWs-transformed - Copy.png" alt="Pixelmemento Logo" />
            <br />
            <span className="splash-description fw-bold">Welcome Admin</span>
          </div>
          <div className="card-body">
            <div>
              <div className="form-group">
                <input
                  className="form-control form-control-sm"
                  id="email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="email"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-sm"
                  id="password"
                  type="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input className="custom-control-input" type="checkbox" />
                  <span className="custom-control-label">Remember Me</span>
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-md btn-block"
                onClick={handleLogin}
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
          <div className="card-footer bg-white p-0  ">
            <div className="card-footer-item card-footer-item-bordered">
              <a href="forgotpassword" className="footer-link">
                Forgot Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;