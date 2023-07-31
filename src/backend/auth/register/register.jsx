import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/fire';
import './register.css';
import { onAuthStateChanged } from 'firebase/auth';


const Register = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);


  const registerform = async () => {
    setIsCreatingAccount(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;
      console.log(user);
      
      // Send verification email
      if (!user.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        setVerificationEmailSent(true);
      }
  

      // Check if the user's email is verified on component mount
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsEmailVerified(user.emailVerified);
          }
        });

        return () => unsubscribe();
      }, []);
      
      setIsCreatingAccount(false);
    } catch (error) {
      console.log(error.message);
      setIsCreatingAccount(false);
    }
  };




  return (
    <div>
      <div className="register-form">
        <div className="card-header mb-4">
          <h2>Register</h2>
        </div>
        <Form>




     
     {/* 
<Form.Item
 label="First Name"
 name="First Name"
 rules={[
   {
     required: true,
     message: 'Please input your First Name!',
   },
 ]}
>
 <Input  onChange={(event) => setRegisterFirstName(event.target.value)}/>
</Form.Item>



<Form.Item
 label="Last Name"
 name="Last Name"
 rules={[
   {
     required: true,
     message: 'Please input your Last Name!',
   },
 ]}
>
 <Input onChange={(event) => setRegisterLastName(event.target.value)} />
</Form.Item> */}





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
          <p>
            {verificationEmailSent
              ? 'Verification email sent. Please check your inbox.'
              : ''}
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
