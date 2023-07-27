import React from 'react';
import useFetch from '../../../assets/hooks/usefetch';
// import Register from '../../../backend/auth/register/register';
import PaintingList from '../../../backend/component/painting-list/painting-list';
// import { auth } from '../../../backend/config/fire'; 
import { useLocation } from 'react-router-dom';
import './shop.css'


const Shop = () => {
    
                
  const location = useLocation();
  const userEmail = location.state?.userEmail;

    const { data: paintings, preloader, error } = useFetch('https://rugrebelsdb.onrender.com/paintings'); 

    // https://rugrebelsdb.onrender.com/paintings
    // https://rugrebelsdb.onrender.com/paintings
  

    // Scene




    
    return (
    
    <div>

<h5>SHOP</h5>
 
    { error && <div>{ error }</div>}

   {/* preloader  */}
    { preloader && <div  className='preloader'>
      <div className="container">
  <canvas id="canvas"></canvas>
</div>
 </div> }                                                                    


    {/* painting list prop      */}
   {paintings && <PaintingList paintinglistprop={paintings} />}

    


        </div>
    );
}

export default Shop;
