import useFetch from '../../../assets/hooks/usefetch';
// import Register from '../../../backend/auth/register/register';
import PaintingList from '../../../backend/component/painting-list/painting-list';
// import { auth } from '../../../backend/config/fire';
import './home.css'; 
import { Link, useLocation } from 'react-router-dom'; 

 


const Home = () => {

  // const location = useLocation();
  // const userEmail = location.state?.userEmail;

    const {  preloader, error } = useFetch('https://rugrebelsdb.onrender.com/paintings'); 

  //   // https://rugrebelsdb.onrender.com/paintings
  //   // https://rugrebelsdb.onrender.com/paintings
  

  //   // Scene







  return (
        <div>
     
  
     {/* { error && <div>{ error }</div>} */}

    {/* preloader  */}
     {/* { preloader && <div  className='preloader'>...Loading </div> }                                                                     */}
  
  {/* {userEmail && <Link to="/admindashboard">Your email is: {userEmail}</Link >}  */}
  {/* <Link to="/profile"> View Profile </Link> */}

 
    
 <div className="header-container">
    <span> WELCOME TO</span>
      <div className="header-border">

          <div className="header">
              <h1>INSIDE PERRY ACE</h1>
                <span>ART GALLERY</span>
          </div>

        </div>
  </div>
  

  <div className="go-to-shop"> 
    <Link to="/shop"><i className="bi fs-1 bi-cart-fill"></i>GO TO STORE  </Link>
  </div>



        </div>
    ); 
}

export default Home;
