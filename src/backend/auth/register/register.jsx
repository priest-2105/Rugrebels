import { useState } from 'react';
import {Link} from 'react-router-dom'; 
import { Button, Checkbox, Form, Input } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { useHistory } from 'react-router-dom'; 
import { auth } from '../../config/fire';  
import './register.css'




const Register = () => {


    // register configs 
    const history = useHistory();

    const [isCreatingAccount, setIsCreatingAccount] = useState(false); // added state for creating account message
  
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
   // const [registerFirstName, setRegisterFirstName] = useState("");
    // const [registerLastName, setRegisterLastName] = useState(""); 
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState(""); 
   
     
  
  
    const registerform = async () => {
        setIsCreatingAccount(true); // set creating account message to true
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          const user = userCredential.user;
          console.log(user);
          history.push({
            pathname: '/',
            state: { userEmail: user.email },
          });
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsCreatingAccount(false); // set creating account message to false
        }
      };
  
  


 
   

    return (
        <div>
        
    
<div className='register-form'>
 <div className="card-header mb-4">
 <h2>Register</h2>  
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
       {isCreatingAccount ? "Creating account..." : "Register"}
     </Button>
   </Form.Item>
   <p>If You Have An Account <Link to="/login">Login</Link> </p>

 </Form>
</div>
        


        </div>
    );
}

export default Register;
