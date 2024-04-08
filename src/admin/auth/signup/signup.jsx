import './signup.css';
import { useState } from 'react';
import { getAuth} from "firebase/auth";
import { setDoc, doc ,collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css'; // Import the main CSS file
import './signup.css';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../../backend/config/fire';





const Signup = () => {
 
    const auth = getAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(''); 
    const [userName, setUserName] = useState(''); 
    const [dateJoined, setDateJoined] = useState(''); 
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


  
    
    
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    


    
    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       setIsEmailVerified(user.emailVerified);
    //     }
    //   });
  
    //   return () => unsubscribe();
    // }, []);


    const getUserIP = async () => {
      try {
          const response = await fetch('https://api.ipify.org/?format=json');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data.ip;
      } catch (error) {
          console.error('Error getting user IP:', error);
          return null;
      }
  };
  
  
    
  const registerform = async (e) => {
    e.preventDefault();
    setIsCreatingAccount(true);
   
    if (!FullName) {
        setIsCreatingAccount(false);
        toast.error('Please enter a phone number.');
        return;
    }


    try {
    

        const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        const user = userCredential.user;
        const userIP = await getUserIP();  
        const customerDocRef = doc(collection(db, 'admins'), user.uid);

        if (registerPassword !== confirmPassword) {
            setIsCreatingAccount(false);
            toast.error('Passwords do not match. Please try again.');
            return;
        }

        await setDoc(customerDocRef, {
            name,
            userName,
            email: registerEmail,
            dateJoined: currentDate,
            loginmethod: 'email',
            userIP,
        });

        console.log('Adding user data to Firestore...');

        try {
            await sendEmailVerification(auth.currentUser);
            navigate(`/adminauth/login`);

            if (!user.emailVerified) {
                await auth.signOut();
                setIsCreatingAccount(false);
                toast.success('Account Created Successfully. Please verify your email before logging in.');
                return;
            }

            console.log('User data added to Firestore successfully.');

            setIsCreatingAccount(false);
        } catch (verificationError) {    
         toast(' ', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    console.error('Error sending email verification', verificationError);
    setIsCreatingAccount(false);
    toast.error('Error sending email verification. Please try again later.');
}
    } catch (error) {
        
        console.log(error.code, error.message);
        setIsCreatingAccount(false);

        switch (error.code) {
            
            case 'auth/email-already-in-use':
                toast.error('The email address is already registered.');
                break;
            case 'auth/invalid-email':
                toast.error('Please enter a valid email address.');
                break;
            case 'auth/weak-password':
                toast.error('The password is too weak. It must be at least 6 characters long.');
                break;
            default:
                console.error('Error with Firebase Authentication:', error);
                toast.error('An error occurred during registration. Please try again later.');
        }
    }
};

  


    return (
        <div>

            <form className="splash-container" style={{height:"100vh"}}>
        <div className="card mt-5">
            <div className="card-header">
           
            <img height="70" width="80" src="/vendors/img/GVlcP7P9rVgB-yYuv8KWs-transformed - Copy.png" alt="Pixelmemento Logo" /><br/>           
                <h5 className="mb-1">PixelMemento Admin</h5>
                <p>Create Your Account</p>
            </div>
            <div className="card-body">
            <input
              autoComplete='on'
              className='d-none'
              type="date"
              name="date"
              id="date"
              defaultValue={currentDate}
            />
            <div className="form-group">
                    <input className="form-control form-control-sm" type="text" id="FullName" name="FullName" required placeholder="Full Name"  autoComplete="off" value={name}  onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input className="form-control form-control-sm" type="text" name="username" required placeholder="Username" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </div>                                                         
              <div className="form-group">
                    <input className="form-control form-control-sm" type="email" name="email" required placeholder="E-mail" autoComplete="off"  value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input className="form-control form-control-sm" id="pass1" type="password" required placeholder="Password" autoComplete="off" value={registerPassword}  onChange={(e) => setRegisterPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control form-control-sm" type='password' required placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                <div className="form-group pt-2">
                    <button className="btn btn-block btn-primary" type="button" onClick={registerform}>            
                {isCreatingAccount ?
                    <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                    : null
                }
                {isCreatingAccount ? 'Creating account...' : 'Register'}
            
                </button>
                </div>
                <div className="form-group">
                </div>
            </div>
            <div className="card-footer bg-white">
                <p>Already member? <a href="/adminauth/login" className="text-secondary">Login Here.</a></p>
            </div>
        </div>
    </form>



        </div>
    );
}

export default Signup;
