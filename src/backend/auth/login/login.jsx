import { Button, Checkbox, Form, Input, message } from 'antd'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../config/fire';
import { Link, useHistory } from 'react-router-dom'; 
import './login.css'; 





const Login =  () => {


    
const history = useHistory();
    
    
const onFinish = (values) => {

  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}; 
  






   
 

const [isLoggingIn, setIsLoggingIn] = useState(false); // added state for creating account message
 
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");  

   const loginform = async () => {
    setIsLoggingIn(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      console.log(user);
      history.push({
        pathname: '/',
        state: { userEmail: user.email },
      });
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        message.error("Email not found. Please try again or register for an account.");
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
  <div className='card-header pb-5'>
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
      <Input onChange={(e) => setLoginEmail(e.target.value)}  />
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
      <Input.Password onChange={(e) => setLoginPassword(e.target.value)}  />
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
       {isLoggingIn ? "Logging in..." : "Login"}
     </Button>
    </Form.Item>
    <p>If You Don't Have An Account <Link to="/register"> Register</Link> </p>
  </Form>
  </div>

 {/* <Link to="/admindashboard">Your email is</Link > */}




            
        </div>
    );
}

export default Login;
