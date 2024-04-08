import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from '../admin/auth/signup/signup';
import Login from '../admin/auth/login/login';
import Forgotpassword from '../admin/auth/forgotpassword/forgotpassword';




const Dashboardauth = () => {
    return (


        <div>
                    
        <Routes>

        <Route exact path="/signup" element={<Signup/>} />


        <Route exact path="/login" element={<Login/>} />


        <Route exact path="/forgotpassword" element={<Forgotpassword/>} />


        <Route path="*" element={<Navigate to="/adminauth/login" />} />
   
        </Routes>



        </div>
    );
}

export default Dashboardauth;
