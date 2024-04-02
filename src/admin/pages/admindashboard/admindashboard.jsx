import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './admindashboard.css';
import { db } from '../../../backend/config/fire';  
import { collection, getDocs, query, orderBy,limit } from 'firebase/firestore';
import Totalcustomerchart from '../../components/cusomterschart/totalcustomerchart';
import RecentOrders from '../orders/recentorders';
import TotalRevenuesAreaChart from '../../components/productrevnue/productrevenue';






 const Admindashboard = () => {

  const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const monthsToShow = months.slice(Math.max(currentMonth - 3, 0), currentMonth);  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
 
   
  const [paintings, setPaintings] = useState([]);
  const [messages, setMessages] = useState([]);



    const handleChangeMonth = (event) => {
      setSelectedMonth(event.target.value);
  }

 const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
 
      }

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




   const [topSoldPaintings, setTopSoldPaintings] = useState([]);

  useEffect(() => {
    const fetchTopSoldPaintings = async () => {
      try {
        const paintingsCollection = collection(db, 'paintings');
        const q = query(paintingsCollection, orderBy('sold', 'desc'), limit(4));
        const snapshot = await getDocs(q);
        const paintingData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTopSoldPaintings(paintingData);
      } catch (error) {
        console.error('Error fetching top sold paintings:', error);
      }
    };

    fetchTopSoldPaintings();
  }, []);



    return (

              <div style={{color:"aliceblue"}}>
            

            {/* { error && <div>{ error }</div>} */}

{/* preloader  */}
 {/* { preloader && <div  className='preloader'>...Loading </div> }  */}


            <h3 className='dashboard-header' >Dashboard</h3>


            {/* <h2>Firebase Authentication User Count: {userCount}</h2> */}
         
           <div className="dashboard-index-charts mb-5">
           
           <div className="dashboard-total-charts total-revenue-chart">
            <h4>Total Revenue</h4>
           <TotalRevenuesAreaChart/>
              </div> 


              <div className="dashboard-total-charts total-customers-chart">
            <h4>Total Customers</h4>
           <Totalcustomerchart />
              </div> 
          
 
        
               </div>


     <div className='monthly-payout-top-product-container'>


            <div className="dashboard-top-products">

            <div className="dashboard-top-products-header d-flex mb-5">
            <h3>Top Products</h3>

       

          </div>
                  {topSoldPaintings 
                    .sort((a, b) => b.sold - a.sold) 
                  .map((painting) => {
          const target = 5000; // Set your target value here
          const percentage = (painting.sold / target) * 100;
          const progressStyle = { width: `${percentage}%` };

          return (
            <div key={painting.id}>
              <div className="most-sold-items-each">  
                <div className="most-sold-items-each-top">
                  <h6 className="d-flex align-items-baseline">
                    {painting.title}
                    <p className="ms-2">{painting.sold} Sold</p>
                  </h6>
                  <span>$ {painting.sold * painting.price}</span>
                </div>
                <div className="most-sold-items-each-progress">
                  <div className="most-sold-items-each-progress-inner" style={progressStyle}></div>
                </div>
              </div>
            </div>
          );
        })}


            </div>



         <div className="monthly-payout">

         <div className="monthly-payout-header d-flex mb-5">
            <h3>Monthly Payout</h3>

              <div className="ms-auto"></div>
              
        <select value={selectedYear} onChange={handleChangeYear} style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>
                <option value={new Date().getFullYear() - 2}  style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>{new Date().getFullYear() - 2}</option>
                <option value={new Date().getFullYear() - 1}  style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>{new Date().getFullYear() - 1}</option>
                <option value={new Date().getFullYear()}  style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>{new Date().getFullYear()}</option>
            </select>

          </div>



                  <table>

          <tr>
          <th> Month </th>
           <th> Date </th>
          <th> Amount </th>
          </tr>

            <tr>
              <td> Mona Lisa </td>
              <td> 11 June, 2020 </td>
              <td> $900 </td>
            </tr>

            <tr>
              <td> Mona Lisa </td>
              <td> 11 June, 2020 </td>
              <td> $900 </td>
            </tr>

            

            <tr>
              <td> Mona Lisa </td>
              <td> 11 June, 2020 </td>
              <td> $900 </td>
            </tr>

            </table>


           </div>          
               </div> 




            <RecentOrders/>
  
 
                                
                
                </div>
    );
}

export default Admindashboard;