import React from 'react';
import { useEffect, useState } from 'react';
import { auth } from '../../config/fire';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './auth.css'

// Register imports 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';


// login imports 
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';



const Auth = () => {



    // Register Config  

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
          setErrorMessage('Account Created Successfully. Please verify your email before logging in.');
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


    // end of register config






    // Login Config 

    const history = useNavigate();

    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    const [isLoggingIn, setIsLoggingIn] = useState(false); // added state for creating account message
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // const [isEmailVerified, setIsEmailVerified] = useState(null); // Added state for email verification
  
    // Check if the user's email is verified on component mount
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsEmailVerified(user.emailVerified);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const loginform = async () => {
      setIsLoggingIn(true);
      try {
        // Check if the user exists
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        
        // Check if the user's email is verified
        if (!userCredential.user.emailVerified) {
          // If the email is not verified, log the user out and display a message
          await auth.signOut();
          console.log('Please verify your email before logging in.');
          message.error('Please verify your email before logging in.');
          setIsLoggingIn(false); // Set isLoggingIn back to false
          return; // Prevent further execution of the login process
        }
    
        // Proceed with login...
        const user = userCredential.user;
        console.log(user);
        history.push({
          pathname: '/',
          state: { userEmail: user.email },
        });
      } catch (error) {
        console.log(error.message);
        if (error.code === 'auth/user-not-found') {
          message.error('Email not found. Please try again or register for an account.');
        } else {
          message.error(error.message);
        }
      } finally {
        setIsLoggingIn(false);
      }
    };
    
    // End of login Config 



    return (
        <div className='auth'>
            
     
     <div className="container">
    <input type="checkbox" id="signup_toggle"/>
    <div className="form" >
        <div className="form_front">
            <div className="form_details">Login</div>
            <form 
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">

            
            <Form.Item name="Email" autoComplete="current-password"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          > <input type="text" placeholder='Email' className="input" onChange={(e) => setLoginEmail(e.target.value)} /> 
          </Form.Item>


          <Form.Item  id="basic_password"   aria-required="true"  autoComplete="current-password" name="password"
            rules={[
              {
                required: true,
                message: 'Did you Forget your password already ?',
              },
            ]}
          >
            <Input.Password placeholder='Password' className="input" onChange={(e) => setLoginPassword(e.target.value)}  />
            {/* <input type="password" placeholder='Password' className="input" onChange={(e) => setLoginPassword(e.target.value)} /> */}

          </Form.Item> 
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 20,
            }}
          >
            <Checkbox className='text-light'>Remember Me</Checkbox>
          </Form.Item
          >

          <Form.Item>   <Button className='input btn' onClick={loginform}>
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </Button>
            </Form.Item> 

            {/* <input type="password" placeholder='Password' className="input" /> */}

            <Link to="/auth/forgotpassword"> Forgot Your Password ? </Link>

            </form>
     <span className="switch">Don't have an account ?               
     <label className="signup_tog" for="signup_toggle">
                    Sign Up
                </label>
            </span>
        </div>
        <div className="form_back">
            <div className="form_details">SignUp</div>
              <Form>
          <Form.Item
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input placeholder='Email' className="input" onChange={(event) => setRegisterEmail(event.target.value)} />
          </Form.Item
          >

          <Form.Item      
          name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password autoComplete='off' className='input' placeholder='Password' onChange={(event) => setRegisterPassword(event.target.value)} />
          </Form.Item
          >

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 20,
            }}
          >
            <Checkbox className='text-light'>Agree to <a href="#">Terms and Condition</a> </Checkbox>
          </Form.Item
          >

          <Form.Item
         
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button placeholder='Password' className="input" onClick={registerform}>
              {isCreatingAccount ? 'Creating account...' : 'Register'}
            </Button>
          </Form.Item
          >

          {errorMessage && <div className="text-success">{errorMessage}</div>}

          <p>
            {verificationEmailSent ? 'Verification email sent. Please check your inbox.' : ''}{' '}
            <span className="switch"> <label className="signup_tog" for="signup_toggle">
              Click here to login
                </label>
            </span>
          </p>
        </Form>
            <span className="switch">Already have an account? 
                <label className="signup_tog" for="signup_toggle">
                    Sign In
                </label>
            </span>
        </div>
    </div>
</div>

        </div>

    );
}

export default Auth;
