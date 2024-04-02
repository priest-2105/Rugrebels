import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../backend/config/fire'; 
import './feedback.css';
import { collection, doc, getDocs, query, where, getDoc, FieldPath } from 'firebase/firestore';
import { message } from 'antd';







const AdminFeedbackDetails = () => {
  const { id } = useParams();

  // Get the messages document reference
  const messagesRef = doc(db, 'messages', id);

  // Use the react-firebase-hooks to fetch the messages document
  const [messagesSnapshot, loading, error] = useDocument(messagesRef);

  // Extract messages data from the snapshot
  const messages = messagesSnapshot?.data();

  // Get the admincustomerlist document reference
const admincustomerlistRef = doc(db, 'admincustomerlist', id);

// Use the react-firebase-hooks to fetch the admincustomerlist document
const [admincustomerlistSnapshot] = useDocument(admincustomerlistRef);

// Extract admincustomerlist data from the snapshot
const admincustomerlist = admincustomerlistSnapshot?.data();


  
  function formatFirebaseTimestamp(timestamp) {
    const dateObject = timestamp.toDate();
    return dateObject.toLocaleDateString(); // Adjust format as needed
  }
  


  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    if (messages && messages.messageuserid) {
      const customerRef = doc(db, 'admincustomerlist', messages.messageuserid);
  
      getDoc(customerRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const customerData = docSnapshot.data();
            setCustomerData(customerData);
          }
        })
        .catch((error) => {
          console.error('Error fetching customer data:', error.message);
        });
    }
  }, [messages]);


  return (
    <div>
     <Link style={{display:"flex", alignItems:"center"}} to="/admin/messages"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Feedback Details</h3></Link> 

      {error && <div>{error.message}</div>}

      {/* Preloader */}
      {loading && <div className='preloader'>...Loading</div>}
        <div className='admin-customer-details-container'>
    
     

      {customerData && (
    <div className="admin-customer-details-container-inner"> 
      <img src={customerData.img} alt={customerData.name} />
      <div className="admin-customer-details-container-inner-description">
        <h2>{customerData.name}</h2>
         <p>{customerData.email}</p>
            </div>
            { messages &&(
          <Link to={`/admin/admincustomerdetails/${messages.messageuserid}`}  title="Send a mail to the users Email address">View Customer Profile <i className="bi bi-people-fill"></i> </Link> 
           )} </div> 
              )} 


            

        
        <nav>
        <div className="nav mt-5 nav-tabs" id="nav-tab" role="tablist">
               <button className="nav-link active" id="admin-customer-activity-tab" data-bs-toggle="tab" data-bs-target="#admin-customer-activity" type="button" role="tab" aria-controls="admin-customer-activity" aria-selected="false">Message Details</button>
         {/* <button className="nav-link ms-2" id="more-customer-details-tab" data-bs-toggle="tab" data-bs-target="#more-customer-details" type="button" role="tab" aria-controls="more-customer-details" aria-selected="true">Sender Details</button> */}
            </div>
        </nav>




        <div className="tab-content p-4" id="nav-tabContent">
        {messages && (
            <div className="tab-pane fade show pt-4 active" id="admin-customer-activity" role="tabpanel" aria-labelledby="admin-customer-activity-tab" tabIndex="0">
                              <span> <h6> Date Sent : </h6><p>{formatFirebaseTimestamp(messages.date)} </p> </span>
                              <span> <h6> Subject : </h6><p>{messages.subject}</p> </span>
                              <span> <h6> Message : </h6><p>{messages.message}</p> </span>
            </div>)}



        </div>


 <button className='btn-danger delete-customer-button' title="Deacivate User">Deacivate Feedback</button>

  </div>

  







    </div>
  );
};

export default AdminFeedbackDetails;
