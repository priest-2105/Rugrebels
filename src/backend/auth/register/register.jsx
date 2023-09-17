import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/fire';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const Register = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
      }
    });

    return () => unsubscribe();
  }, []);

  const registerform = async () => {
    setIsCreatingAccount(true);
    setErrorMessage(''); // Clear previous error message
    try {
      // Send verification email
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const user = userCredential.user;
      console.log(user);

      await sendEmailVerification(auth.currentUser);

      // Check if the user's email is verified
      if (!user.emailVerified) {
        // If the email is not verified, log the user out and display a message
        await auth.signOut();
        setIsCreatingAccount(false);
        setErrorMessage('Please verify your email before logging in.');
        return;
      }

      // Verification email sent successfully
      setVerificationEmailSent(true);
      console.log('Verification email sent.');

      // Proceed with account creation and login...

      setIsCreatingAccount(false);
    } catch (error) {
      console.log(error.code, error.message);
      setIsCreatingAccount(false);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('The email address is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Please enter a valid email address.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className="register-form">
        <div className="card-header mb-4">
          <h2>Register</h2>
        </div>
        <Form>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input onChange={(event) => setRegisterEmail(event.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password onChange={(event) => setRegisterPassword(event.target.value)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" onClick={registerform}>
              {isCreatingAccount ? 'Creating account...' : 'Register'}
            </Button>
          </Form.Item>

          {errorMessage && <div className="text-danger">{errorMessage}</div>}

          <p>
            {verificationEmailSent ? 'Verification email sent. Please check your inbox.' : ''}{' '}
            <Link to="/login">Click here to login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
