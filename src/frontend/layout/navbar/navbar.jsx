import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../backend/config/fire';
import './navbar.css'; 
import { useState, useEffect } from 'react'; 


const Navbar = () => {

    const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  





    
    return (
        <div className='nav-container'>
            
 
   {/* DEsktop Navabr  */}

   <nav className="navbar desktop-navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
      <li className="nav-item"> 
                      <Link className="nav-link" to="/">Home</Link>
                     </li>
            <li className='nav-item'> 
                    <Link className="nav-link" to="/about" >About</Link>
                     </li>            
          
            <li className='nav-item'> 
                    <Link className="nav-link" to="/shop">Shop</Link>
                     </li>
                       <li className='nav-item'> 
                    <Link className="nav-link" to="/contact">Contact</Link>
                     </li> 
    <div className="socials border-0 d-flex me-5 align-items-center">
    
     <Link to="https://facebook.com"><i className="bi bi-twitter"></i></Link>
   

    
     <Link to="https://instagram.com"><i className="bi bi-instagram"></i></Link>
   
    
     <Link to="https://twitter.com"><i className="bi bi-facebook"></i></Link>
   </div>

      </ul>

  

         <div style={{color: "rgb(233, 222, 155)"}} className="profile-tab d-flex align-items-center ">
        <Link className="nav-link me-4" to="/cart"><i className="bi fs-1 bi-cart-fill"></i></Link>
        <Link to="/profile">
            <i className="bi bi-person-circle"></i>
            {user ? (
        <>
          <p>{user.email}</p>
        </>
      ) : (
        <p>Log In</p>
      )}
             </Link> 
         </div>
    </div>
  </div>
</nav>












     {/* mobile navbar  */}
            <nav className="navbar mobile-navbar pt-4">
  <div className="container-fluid ">
    <a className="navbar-brand" href="#">BRAND LOGO</a>
    <Link className="nav-link ms-auto me-3" to="/cart"><i className="bi fs-1 bi-cart-fill"></i></Link> 
     <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end bg-transparent" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
       
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        
         </div>

      <div className="offcanvas-body">
    
        <ul className="navbar-nav mt-5 justify-content-center flex-grow-1 pe-3">
          <li className="nav-item"> 
                      <Link className="nav-link" to="/">Home</Link>
                     </li>
            <li className='nav-item'> 
                    <Link className="nav-link" to="/about" >About</Link>
                     </li>            
            <li className='nav-item'> 
                    <Link className="nav-link" to="/shop">Shop</Link>
                     </li>
                     <li className='nav-item'> 
                    <Link className="nav-link" to="/contact">Contact</Link>
                     </li>
                   
                        </ul>  
       
         <div style={{color: "rgb(233, 222, 155)"}} className="profile-tab me-3 mt-5">
        <Link to="/profile">
            <i className="bi bi-person-circle"></i>
            {user ? (
        <>
          <p>{user.email}</p>
        </>
      ) : (
        <p>Log In</p>
      )}
             </Link> </div>

             <div className="socials d-flex text-center mt-5 ms-5 align-items-center">
   <li className='ms-3'> 
     <Link to="https://facebook.com"><i className="bi bi-twitter"></i></Link>
   </li>
   

   <li> 
     <Link to="https://instagram.com"><i className="bi bi-instagram"></i></Link>
   </li>

   <li> 
     <Link to="https://twitter.com"><i className="bi bi-facebook"></i></Link>
   </li>
   </div>
      </div>
    </div>
  </div>
</nav>








        </div>
    );
}

export default Navbar;
