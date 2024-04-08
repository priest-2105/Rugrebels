import React from 'react';
import { Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from '../frontend/layout/navbar/navbar';
import Footer from '../frontend/layout/footer/footer';
import Home from '../frontend/pages/homepage/home';
import About from '../frontend/pages/about/about';
import Shop from '../frontend/pages/shop/shop';
import Contact from '../frontend/pages/contact/contact';
import Paintingdetails from '../backend/component/paintingdetails/paintingdetails';
import Gallery from '../frontend/pages/galllery/gallery';




const ProtectedRoute = ({ element, ...props }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Wait until the authentication state is resolved
    return null;
  }

  return user ? (
    element
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

const Public = () => {




    return (
        <div className='bg-dark'>

            <Navbar/>

            <div>

            <Routes>



            <Route exact path="/" element={<Home/>} />

            <Route exact path="/shop" element={<Shop/>} />

            <Route exact path="/about" element={<About/>} />

            <Route exact path="/contact" element={<Contact/>} />
            
            <Route path="/paintings/:id" element={<Paintingdetails/>} />
          
            <Route path="/gallery" element={<Gallery/>} />

            {/* <Route path="/checkout" element={<Checkout/>} /> */}
            <Route path="*" element={<Navigate to="/publicpath/home" />} />



            </Routes>

            </div>
            {/* <Footer/> */}

        </div>
    );
}

export default Public;
