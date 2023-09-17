import { Button, Checkbox, Form, Input, message } from 'antd';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../config/fire';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
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
  const [isEmailVerified, setIsEmailVerified] = useState(null); // Added state for email verification

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
  

  
  return (
    <div>
      <div className="login-form">
        <div className="card-header pb-5">
          <h2> LOGIN</h2>
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            autoComplete="current-password"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input onChange={(e) => setLoginEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            id="basic_password"
            aria-required="true"
            autoComplete="current-password"
            className="css-dev-only-do-not-override-10ed4xt"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password onChange={(e) => setLoginPassword(e.target.value)} />
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
            <Button type="primary" onClick={loginform}>
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>

          <p>If You Don't Have An Account <Link to="/register"> Register</Link> </p>

          <div className="text-danger">
      {!isEmailVerified && (
        <div className="text-danger">
          <p>Please verify your email before logging in.</p>
        </div>
      )}

          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
