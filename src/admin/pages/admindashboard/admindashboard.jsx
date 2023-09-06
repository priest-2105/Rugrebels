import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './admindashboard.css';
import { db } from '../../../backend/config/fire'; // Import the Firestore instance from your Firebase configuration
import Adminpaintinglist from '../adminpaintinglist/adminpaintinglist';
import Messages from '../messages/messages';
 import ReactPDFChart from 'react-pdf-charts';







 const Admindashboard = () => {
  const [paintings, setPaintings] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const paintingsRef = db.collection('paintings');
        const snapshot = await paintingsRef.get();
        const paintingData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPaintings(paintingData);
      } catch (error) {
        console.error('Error fetching paintings:', error); // Log the error here
      }
    };

    const fetchMessages = async () => {
      try {
        const messagesRef = db.collection('messages');
        const snapshot = await messagesRef.get();
        const messageData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messageData);
      } catch (error) {
        console.error('Error fetching messages:', error); // Log the error here
      }
    };

    fetchPaintings();
    fetchMessages();
  }, []);



 

  const data = [
      {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
      },
      {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
      },
      {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
      },
      {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
      },
      {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
      },
      {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
      },
      {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
      },
  ];


    return (

              <div>
            

            {/* { error && <div>{ error }</div>} */}

{/* preloader  */}
 {/* { preloader && <div  className='preloader'>...Loading </div> }                                                                     */}


            <h3 className='dashboard-header' >Admin Dashboard</h3>

            {/* <h2>Firebase Authentication User Count: {userCount}</h2> */}
         
                <div className="cards mb-5">


                    <ReactPDFChart>
            <LineChart data={data} height={300} width={500}>
                <XAxis dataKey='name' />
                <YAxis />
                <CartesianGrid stroke='#eee' strokeDasharray='5' />
                <Line type='monotone' dataKey='uv' stroke='#8884d8' />
                <Line type='monotone' dataKey='pv' stroke='#82ca9d' />
            </LineChart>
        </ReactPDFChart>



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
    


       <div className="painting-section mt-5 pt-5 ms-auto me-auto pb-5">
        <div className="painting-header ms-auto mt-3 me-auto col-lg-10 align-items-center  d-flex">
          <h2> Manage Paintings</h2>
          <li className="text-end ms-auto new-painting-link">
            <Link to="/addPainting">Add New painting <i className="bi bi-brush-fill"></i></Link>
          </li>
        </div>
        {paintings && <Adminpaintinglist paintinglistprop={paintings} />}
      </div>
 













                                
                
                </div>
    );
}

export default Admindashboard;