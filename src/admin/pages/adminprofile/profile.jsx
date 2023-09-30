import React, { useState, useEffect } from 'react';
import {  sendPasswordResetEmail, updateEmail, deleteUser } from 'firebase/auth';
import './profile.css';
import { auth } from '../../../backend/config/fire';

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
        <div> 
             <div className="admin-dashboard-profile-container">
  
       
            <h3>Account Information</h3>

             <div className="admin-dashboard-profile">

              <h6> <i className="bi bi-exclamation-circle"></i> This account was created 11-09-2022</h6>
    
             <div className="dashboard-profile-pic-change">
               
               <h4>Profile Picture Change</h4>

              <img src="https://firebasestorage.googleapis.com/v0/b/rugrebelsstore.appspot.com/o/users%2Fcoolking%20bear.png?alt=media&token=6811bcf5-352c-4da0-9b75-04372f5490bb" alt="" /> 

              <button>Change</button>
           </div>
            

           {user ? (
            <> <div className="dashboard-profile-account-information">

          <h4>Profile Information</h4>

          <div className="dashboard-profile-account-information-input-group">

          <input type="text" name="FullName" value={user.name} className='input' placeholder='Full Name' id="FullName" />
          <input type="email" name="email" value={user.email} className='input' placeholder='Email Address' id="email" />

          </div>


          <div className="dashboard-profile-account-information-input-group">

          <input type="tel" name="mobilenumber"  value={user.phone} className='input' placeholder='Phone Number' id="mobilenumber" />
          <input type="date" name="dateofbirth" className='input'  value={user.dateofbirth} placeholder='Date Of Birth' id="dateofbirth" />

          </div>


          
          <div className="dashboard-profile-account-information-input-group">

          <button>Save Changes</button>
          </div>

        </div></> ) : (
            <p>You are not logged in</p>
          )}


        <div className="dashboard-profile-account-security">
        
        <h4>Account Security</h4>

        <div className="dashboard-profile-account-security-inner d-block">
          {user ? (
            <>
             <div>
               <form> <input
                  type="email"
                  value={newEmail}
                  className='input'
                  required
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                />
                <button type="button" className='dashboard-change-email-adress pt-3 pb-3 ms-2' onClick={handleChangeEmail}>
                  Change Email Address
                </button>
                {error && <div>{error}</div>}
              </form></div>
        <div className="d-flex mt-5">
              
               <button type="button" className='bg-success' onClick={handleResetPassword}>
                Reset Password
              </button>
              
              <button type="button" className='bg-danger ms-auto' data-bs-toggle="modal" data-bs-target="#delete-account-modal">
                Delete Account
              </button> 
              </div>




            </>
          ) : (
            <p>You are not logged in</p>
          )}
        </div>
              
        </div>
        </div>
    
    </div>



                    {/* Delete Account modal  */}
                      

                    <div class="modal fade delete-account-modal" id="delete-account-modal" tabindex="-1" aria-labelledby="delete-account-modalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="delete-account-modalLabel">Are You Sure You Want to Delete Account ?</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="delete-account-modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p> Input your password to delete you Account </p>
                        <input type="text" name="textpwd" id="textpwd" />
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn-light" data-bs-dismiss="delete-account-modal">Close</button>
                      <button  type="button" className="bg-danger"  onClick={handleDeleteAccount}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
                                      
                
                    {/* end of Delete Account modal */}
    
    
    </div>

  );
};

export default Profile;
