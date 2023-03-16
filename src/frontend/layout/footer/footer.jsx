import React from 'react';
import'./footer.css'
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div>
            <div className="footer-container mt-5 pt-5">

        
            


   
   <div className="footer mt-5">



   <li> 
     <Link to="/TermsAndConditions">Terms And Conditions</Link>
   </li>
   

   <li> 
     <Link to="/TermsAndConditions">Disclaimer</Link>
   </li>
   

   <div className="socials d-flex align-items-center">
   <li> 
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
    );
}

export default Footer;
