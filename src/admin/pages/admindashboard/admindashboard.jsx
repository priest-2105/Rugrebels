import React, { useEffect } from 'react';
import useFetch from '../../../assets/hooks/usefetch';
import Adminpaintinglist from '../adminpaintinglist/adminpaintinglist';
import { Link } from 'react-router-dom';
import './admindashboard.css';
// import { getAuth } from 'firebase/auth';
import { useState } from 'react';  
import Messages from '../messages/messages';



const Admindashboard = () => {


 const { data: paintings, preloader, error } = useFetch('http://localhost:8000/paintings'); 
   
  
//  const [userCount, setUserCount] = useState(0);

  // const auth = getAuth();


// useEffect(() => {
//   auth.listUsers().then((result) => {
//     setUserCount(result.users.length);
//   });
//   console.log(auth);
// }, []);


  const { data: messages} = useFetch('http://localhost:8000/messages'); 
    

    return (

              <div>
            

            { error && <div>{ error }</div>}

{/* preloader  */}
 { preloader && <div  className='preloader'>...Loading </div> }                                                                    


            <h3 className='dashboard-header' >Admin Dashboard</h3>

            {/* <h2>Firebase Authentication User Count: {userCount}</h2> */}
         
                <div className="cards mb-5">

                <div className="card text-center progress-cards">
          <div className="card-header fs-4">
           USERS
          </div>
          <h1 className='statistics-text' >0</h1>
               </div>

                      <div className="card text-center progress-cards ">
                          <div className="card-header fs-4">
                           PAINTINGS
                          </div>
                          <h1 className='statistics-text' >0</h1>
                          
                      </div>

                      <div className="card text-center progress-cards">
                          <div className="card-header fs-4">
                               PAINTINGS SOLD
                          </div>
                          <h1 className='statistics-text' >0</h1>
                          
                      </div>

                      <div className="card text-center progress-cards">
                          <div className="card-header fs-4">
                           PAINTINGS IN STOCK
                          </div>
                          <h1 className='statistics-text' >0</h1>
                      </div>

                      <div className="card text-center progress-cards">
                          <div className="card-header fs-4">
                      TOTAL MONEY MADE
                          </div>
                          <h1 className='statistics-text' >0</h1>
                      </div>

                      <div className="card text-center progress-cards">
                          <div className="card-header fs-4">
                      TOTAL MONEY MADE
                          </div>
                          <h1 className='statistics-text' >0</h1>
                      </div>
                     

                </div>


  
   


       {/* Messages props  */}
       <div className="admin-messages pb-5 mb-5">
         {messages && <Messages messagelistprop={messages} />}

       </div>
    


     {/* painting list prop      */}
     <div className="painting-section mt-5 pt-5 ms-auto me-auto pb-5">
        <div className="painting-header ms-auto mt-3 me-auto col-lg-10 align-items-center  d-flex">
            <h2> Manage Paintings</h2>
 
   <li  className="text-end ms-auto new-painting-link"> <Link to="/addPainting">Add New painting <i class="bi bi-brush-fill"></i></Link>    </li>
        </div> 
    {paintings && <Adminpaintinglist paintinglistprop={paintings} />}

 
        </div>













                                
                
                </div>
    );
}

export default Admindashboard;