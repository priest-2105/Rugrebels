import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../backend/config/fire'; 
import { doc, getDoc } from 'firebase/firestore';
import './feedback.css';

const AdminFeedbackDetails = () => {
  const { id } = useParams();

  // Get the messages document reference
  const messagesRef = doc(db, 'messages', id);

  // Use the react-firebase-hooks to fetch the messages document
  const [messagesSnapshot, loading, error] = useDocument(messagesRef);

  // Extract messages data from the snapshot
  const messages = messagesSnapshot?.data();


  
  function formatFirebaseTimestamp(timestamp) {
    const dateObject = timestamp.toDate();
    return dateObject.toLocaleDateString(); // Adjust format as needed
  }
  

  return (
    <div>
     <Link style={{display:"flex", alignItems:"center"}} to="/admin/customers"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Feedback Details</h3></Link> 

      {error && <div>{error.message}</div>}

      {/* Preloader */}
      {loading && <div className='preloader'>...Loading</div>}
        <div className='admin-customer-details-container'>
    
      {messages && (
    <div className="admin-customer-details-container-inner"> 
      <img src={messages.img} alt={messages.name} />
      <div className="admin-customer-details-container-inner-description">
        <h2>{messages.name}</h2>
         <p>{messages.email}</p>
            </div>
             <button title="Send a mail to the users Email address">Send a Mail <i className="bi bi-envelope-at-fill"></i> </button> 
            </div> 
              )} 


            

        
        <nav>
        <div className="nav mt-5 nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="more-customer-details-tab" data-bs-toggle="tab" data-bs-target="#more-customer-details" type="button" role="tab" aria-controls="more-customer-details" aria-selected="true">More Details</button>
            <button className="nav-link ms-2" id="admin-customer-activity-tab" data-bs-toggle="tab" data-bs-target="#admin-customer-activity" type="button" role="tab" aria-controls="admin-customer-activity" aria-selected="false">Activity</button>
            </div>
        </nav>




        <div className="tab-content p-4" id="nav-tabContent">

            {messages && (
            <div className="tab-pane  admin-customer-more-details-tab fade show pt-4 active" id="more-customer-details" role="tabpanel" aria-labelledby="more-customer-details-tab" tabIndex="0">
                 <span> <h6> Phone Number :</h6> <p> {messages.phonenumber} </p> </span>
                 <span><h6>Address :</h6> <p>{messages.location}</p> </span>
                 <span> <h6> Total Amount Spent : </h6><p>${messages.amountspent} </p> </span>
                <span> <h6> Date Join : </h6><p>{formatFirebaseTimestamp(messages.date)} </p> </span>
             </div>)} 


            <div className="tab-pane fade" id="admin-customer-activity" role="tabpanel" aria-labelledby="admin-customer-activity-tab" tabIndex="0">
                aciivity
            </div>


        </div>


 <button className='btn-danger delete-customer-button' title="Deacivate User">Deacivate User </button>

  </div>

  







    </div>
  );
};

export default AdminFeedbackDetails;
