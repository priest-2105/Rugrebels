import React from 'react';
import useFetch from '../../../assets/hooks/usefetch';
import Adminpaintinglist from '../adminpaintinglist/adminpaintinglist';
import { Link } from 'react-router-dom';


import './admindashboard.css';




const Admindashboard = () => {

 const { data: paintings, preloader, error } = useFetch('http://localhost:8000/paintings'); 
  
    

    return (

              <div>
            
            <h3>Admin Dashboard</h3>


            <li> 
                      <Link to="/addPainting">Add painting</Link>
                     </li>
                


  
   
     { error && <div>{ error }</div>}

    {/* preloader  */}
     { preloader && <div  className='preloader'>...Loading </div> }                                                                    


     {/* painting list prop      */}
    {paintings && <Adminpaintinglist paintinglistprop={paintings} />}

 














                                
                
                </div>
    );
}

export default Admindashboard;
