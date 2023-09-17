import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Auth from '../backend/auth/auth/auth'
import Forgotpassword from '../backend/auth/forgotpassword/forgotpassword'
import Verify from '../backend/auth/verify/verify'
import Profile from '../backend/profile/profile';



const Auth = () => {


    return (
        <div>
            
        <Routes>


            <Route exact path="/auth" element={<Auth/>} />

            <Route exact path="/forgotpassword" element={<Forgotpassword/>} />

            <Route exact path="/verifypassword" element={<Verify/>} />

            <Route exact path="/user/Profile" element={<Profile/>} />


            </Routes>

        </div>
    );
}

export default Auth;
