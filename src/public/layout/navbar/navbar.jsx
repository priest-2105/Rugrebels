import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../backend/config/fire';
import './navbar.css'; 
import { useState, useEffect } from 'react'; 
import Profile from '../../../backend/profile/profile'; 
import Cart from '../../../backend/cart/carts/cart';




  const Newnavbar = () => {

    const [user, setUser] = useState(null);


    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setUser(user);
      });
      return unsubscribe;
    }, []);


    return (
        <div>
            
            <nav className="navbar bg-transparent fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand d-flex align-items-center ms-lg-4 ms-md-3" to="/">
       <img className='navbar-brand-logo' src="/images/327614953_1009264350035658_5769637390323480968_n-removebg-preview.png" alt="" />
         <p className='navbar-brand-p'>Rug Rebels</p></Link>
  
          <Link className='ms-auto me-xs-3 me-sm-4 me-md-5 me-lg-5 text-end' to="/cart"> <i className="bi fs-3 bi-cart-fill "></i> </Link>           
  
    <button className="navbar-togglericons bg-transparent border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
    <img src="/images/sandwich.png" alt="" />
    </button>
    <div className="offcanvas animate-open navbar-offcanvas offcanvas-end" tablndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header d-flex align-items-center">
      <Link className="navbar-brand d-flex align-items-center ms-0" to="/">
       <img className='navbar-brand-logo' src="/images/327614953_1009264350035658_5769637390323480968_n-removebg-preview.png" alt="" />
         <p className='navbar-brand-p'>Rug Rebels</p></Link>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shop">Store</Link>
          </li>
             <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
             <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="profile-tab me-3 mt-4">
        <div className="profile-section d-block">
             {user ? (
        <> 
          <Link to="/profile" className="text-center ms-auto me-auto text-light border-0">
       <i className="bi text-center bi-person-circle"></i> 
        <p>{user.email}</p> </Link>
        </>
      ) : ( 
       <Link to="/auth">
       <i className="bi bi-person-circle"></i> 
         <p>Log In</p>
       </Link>    
      )}
       </div>  </div>
       


        <div className="footer offcanvas-footer bg-transparent justify-content-around">
    <Link target='_blank' to="https://facebook.com"><i className="bi bi-twitter"></i></Link>
    
   <Link target='_blank' to="https://instagram.com"><i className="bi bi-instagram"></i></Link>
  
   <Link target='_blank' to="https://twitter.com"><i className="bi bi-facebook"></i></Link>
        </div>

      
      </div>
    </div>
  </div>
</nav>




        </div>
    );
}

export default Newnavbar;
