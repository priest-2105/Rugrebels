import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../backend/config/fire'; 
import { collection, doc, getDocs, query, where, getDoc, FieldPath, deleteDoc } from 'firebase/firestore';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './feedback.css';







const AdminFeedbackDetails = () => {
 
  

  


  const navigate = useNavigate();
  
  const [messagedelete, setMessagedelete] = useState(false);

  const { id } = useParams();

  // Get the messages document reference
  const messagesRef = doc(db, 'feedbacks', id);

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


  const handleDeletemessage = async () => {
    try {
      await deleteDoc(messagesRef); // Use deleteDoc instead of collection(...).doc(...)
      console.log('Message Deleted');
      setMessagedelete(true);
      
      navigate('/admin/feedback');
    } catch (error) {
      console.error('Error removing message:', error);
    }
  };
    







  return (
    <div>
    <Link style={{display:"flex", alignItems:"center"}} to="/admin/feedback"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Feedback Details</h3></Link> 

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
                             <span className='mt-5'> <h6> Sender : </h6><p>{messages.name}</p> </span>
                             <span className='mt-5'> <h6> Subject : </h6><p>{messages.subject}</p> </span>
                             <span className='mt-5'> <h6> Message : </h6><p>{messages.message}</p> </span>
                         <span className='mt-5'> <h6> Date Sent : </h6><p>{formatFirebaseTimestamp(messages.timestamp)} </p> </span>
                        </div>)}



       </div>


                      <button className='btn-danger delete-customer-button' 
                       data-bs-toggle="modal" 
                       data-bs-target={`#deletemessagemodal-${message.id}`}
                      title="Deacivate User">Delete Feedback</button>

 </div>

 



                     {/* Delete Message Modal */}
                     <div 
                       className="modal fade" 
                       id={`deletemessagemodal-${message.id}`} 
                       tabIndex="-1" 
                       aria-labelledby={`deletemessagemodalLabel-${message.id}`} 
                       aria-hidden="true"
                     >
                       <div className="modal-dialog border-danger">
                         <div className="modal-content">
                           <div className="modal-header">
                             <h1 className="modal-title fs-5" id={`deletemessagemodalLabel-${message.id}`}> Delete Message </h1>
                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div className="modal-body" key={message.id} > 
                 
                 <div className="card-header fs-5 text-start">Are you sure you want to Delete the 
                 Message from  {message.name}</div> 
                 </div>
                 <div className="modal-footer">
                     <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                     <button className="btn ms-3 btn-danger"  data-bs-dismiss="modal"   onClick={() => handleDeletemessage(message.id)}><i className="bi bi-trash3-fill"></i></button>
                     {messagedelete && <p className="notification">Message Deleted</p>}
       
            
                 </div>
                 </div>
             </div>
             </div>
                




   </div>
  );
};

export default AdminFeedbackDetails;
