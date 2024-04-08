import { useState } from 'react';
import { auth } from '../../../backend/config/fire';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState('');
  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);

  const handleResetPassword = async () => {
    setIsSendingResetEmail(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success('Password reset email sent. Check your inbox.');
      navigate('/adminauth/login');
    } catch (error) {
      console.error('Error sending reset password email:', error.message);
      if (error.code === 'auth/user-not-found') {
        toast.error('Email not found. Please try again or register for an account.');
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsSendingResetEmail(false);
    }
  };

  return (
    <div>
      <div className="splash-container align-items-center" style={{ height: '100vh' }}>
        <div className="card mt-5">
          <div className="card-header text-center">
            <img height="70" width="80" src="/vendors/img/ATMSlogo.png" alt="ATMS LOGO" />
            <br />
            <span className="splash-description fw-bold">Welcome Admin</span>
          </div>
          <div className="card-body">
            <div>
              <div className="form-group">
                <input
                  className="form-control form-control-sm"
                  id="email"
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary btn-md btn-block"
                onClick={handleResetPassword}
                disabled={isSendingResetEmail}
              >
                {isSendingResetEmail ? 'Sending Email...' : 'Reset Password'}
              </button>
            </div>
          </div>
          <div className="card-footer bg-white p-0">
            <div className="card-footer-item card-footer-item-bordered">
              <span className="footer-link" onClick={() => navigate('/adminauth/login')}>
                Back to Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
