import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../backend/config/fire';
import './navbar.css'; 
import { useState, useEffect } from 'react'; 
import Profile from '../../../backend/profile/profile'; 
import Cart from '../../../backend/cart/carts/cart';



 


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
    <a className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </a>
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
         <a className="text-light border-0 me-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartCanvas" aria-controls="cartCanvas">
      <i className="bi fs-1 bi-cart-fill" style={{color:"rgb(233, 222, 155)"}}></i>
    </a>
      <div className="profile-section d-block">
      
            {user ? (
        <> 
            <Link className="" type="button" data-bs-toggle="offcanvas" data-bs-target="#profileCanvas" aria-controls="profileCanvas">
       <i className="bi bi-person-circle"></i> 
         <p>{user.email}</p> </Link>
        </>
      ) : ( 
       <Link to="/login">
       <i className="bi bi-person-circle"></i> 
         <p>Log In</p>
       </Link>    
      )}    </div> 
         </div>
    </div>
  </div>
</nav>












     {/* mobile navbar  */}
            <nav className="navbar mobile-navbar pt-4">
  <div className="container-fluid ">
    <a className="navbar-brand" href="#">BRANDLOGO</a>
    <button className="navbar-toggler text-end ms-auto me-4 text-light border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartCanvas" aria-controls="cartCanvas">
      <i className="bi fs-1 bi-cart-fill" style={{color:"rgb(233, 222, 155)"}}></i>
    </button>
   <button className="navbar-toggler text-light border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
     <div className="wrapper-menu">
  <div className="line-menu half start"></div>
  <div className="line-menu"></div>
  <div className="line-menu half end"></div>
</div>
    </button>
    <div className="offcanvas offcanvas-end bg-transparent" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
       
        <button type="button" className="bg-transparent text-light fs-1 border-0" data-bs-dismiss="offcanvas" aria-label="Close">
        <i className="bi bi-x-lg"></i> 
        </button>
        
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
   <div className="profile-section d-block">
             {user ? (
        <> 
          <Link className="navbar-toggler text-center ms-auto me-4 text-light border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#profileCanvas" aria-controls="profileCanvas">
       <i className="bi bi-person-circle"></i> 
        <p>{user.email}</p> </Link>
        </>
      ) : ( 
       <Link to="/login">
       <i className="bi bi-person-circle"></i> 
         <p>Log In</p>
       </Link>    
      )}
       </div>  
             </div>

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














{/* Cart Canvas  */}
    <div className="offcanvas offcanvas-end cart-canvas" tabIndex="-1" id="cartCanvas" aria-labelledby="cartCanvasLabel">
      <div className="offcanvas-header cart-canvas-header">
        <h5 className="offcanvas-title text-light fs-1" id="cartCanvasLabel">Cart</h5>
       
        <button type="button" className="bg-transparent text-light fs-1 border-0" data-bs-dismiss="offcanvas" aria-label="Close">
        <i className="bi bi-x-lg"></i> 
        </button>
        
         </div>

      <div className="offcanvas-body cart-canvas-body">
       

        <Cart/>


    </div>
  </div>







{/* profile Canvas  */}
<div className="offcanvas offcanvas-end profile-canvas" tabIndex="-1" id="profileCanvas" aria-labelledby="profileCanvasLabel">
      <div className="offcanvas-header profile-canvas-header">
        <h5 className="offcanvas-title text-light fs-1" id="profileCanvasLabel">Profile</h5>
       
        <button type="button" className="bg-transparent text-light fs-1 border-0" data-bs-dismiss="offcanvas" aria-label="Close">
        <i className="bi bi-x-lg"></i> 
        </button>
        
         </div>

      <div className="offcanvas-body profile-canvas-body">
       

        <Profile/>


    </div>
  </div>





        </div>
    );
}

export default Navbar;
