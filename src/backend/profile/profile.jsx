import React, { useState, useEffect } from 'react';
import { signOut, sendPasswordResetEmail, updateEmail, deleteUser } from 'firebase/auth';
import './profile.css';
import { auth } from '../config/fire';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert('Password reset email sent. Please check your Email.');
    } catch (error) {
      console.log('Error sending password reset email:', error.message);
      alert('An error occurred while sending the password reset email. Please try again later.');
    }
  };

  const handleChangeEmail = async () => {
    try {
      await updateEmail(user, newEmail);
      alert('Email address updated successfully.');
    } catch (error) {
      console.log('Error updating email address:', error.message);
      setError('An error occurred while updating the email address. Please try again later.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser(user);
        alert('Your account has been deleted successfully.');
      } catch (error) {
        console.log('Error deleting account:', error.message);
        setError('An error occurred while deleting your account. Please try again later.');
      }
    }
  };

  return (
    <div className="text-center justify-content-center d-block">
      {user ? (
        <>
          <i className="bi bi-person-circle fs-1"></i>
          <p>{user.email}</p>

          <button type="button" onClick={handleResetPassword}>
            Reset Password
          </button>

          <div>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
            />
            <button type="button" onClick={handleChangeEmail}>
              Change Email Address
            </button>
            {error && <div>{error}</div>}
          </div>

          <button type="button" onClick={handleDeleteAccount}>
            Delete Account
          </button>

          <button type="button" className="logout-button" onClick={logOut}>
            Logout
          </button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default Profile;
