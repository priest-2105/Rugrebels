import React, { useState } from 'react';
import './forgotpassword.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/fire';

const Forgotpassword = () => {

  const [email, setEmail] = useState('');
  
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Please check your Email.');
    } catch (error) {
      console.log('Error sending password reset email:', error.message);
      alert('An error occurred while sending the password reset email. Please try again later.');
    }
  };

  return (
    <div>
      <div class="container">
      <input   
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required name="Reset Password" class="input"/>
         <button className='btn ms-3' type="button" onClick={handleResetPassword}>
        Get Link
      </button>
</div>
   


 

    </div>
  );
};

export default Forgotpassword;
