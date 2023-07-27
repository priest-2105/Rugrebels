import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './messages.css';
import { useState } from 'react';


const Messages = (props) => {
  const messages = props.messagelistprop;
  const [messagedelete, setMessagedelete] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

//   const handlemessageAddToCart = (message) => {
//     fetch('https://rugrebelsdb.onrender.com/messages', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(message)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setAddedmessagelist(true);
//         setTimeout(() => {
//           setAddedmessagelist(false);
//         }, 3000);  
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

const handleDeletemessage = (id) => {
    fetch(`https://rugrebelsdb.onrender.com/messages/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Message Deleted");
        // Reload the messages after removing the message
        fetch('https://rugrebelsdb.onrender.com/messages')
          .then(response => response.json())
          .then(data => {
            setMessages(data);
            setMessagedelete(true);
            setTimeout(() => {
              setMessagedelete(false);
            }, 3000); 
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.log("error removing message", error);
      });
  };
  
  

  const handleViewmessage = (date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };

  return ( 
    <div className="message-preview-container mb-5 mt-5"> 
      <div className="container row ms-auto me-auto mt-5">
        <div className="message-table-container"> 
          <h2 className="text-center  headers mt-5 text-light mb-4">Messages</h2>
          <table className="message-table ms-auto me-auto mt-5 rounded border-2">
            <thead>
              <tr className="">
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>  
                <th>Date</th>
                <th>Actions</th>
              </tr> 
            </thead>
            <tbody>
              {messages.map((message) => ( 
                <tr key={message.id}>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.subject}</td> 
                  <td>{message.date}</td> 
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-info" 
                      data-bs-toggle="modal" 
                      data-bs-target={`#viewmessagemodal-${message.id}`}
                      onClick={() => handleViewmessage(message.date)}
                    >
                      View
                    </button>
                    <button 
                      className="btn ms-3 btn-danger" 
                      data-bs-toggle="modal" 
                      data-bs-target={`#deletemessagemodal-${message.id}`}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button></td>

                    {/* Delete Message Modal */}
                    <div 
                      className="modal fade" 
                      id={`deletemessagemodal-${message.id}`} 
                      tabindex="-1" 
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
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button className="btn ms-3 btn-danger" onClick={() => handleDeletemessage(message.id)}><i className="bi bi-trash3-fill"></i></button>
                    {messagedelete && <p className="notification">Message Deleted</p>}
      
           
                </div>
                </div>
            </div>
            </div>
               
               
               
               
               
               
                    {/* view Message Modal */}
                    <div 
                      className="modal fade" 
                      id={`viewmessagemodal-${message.id}`} 
                      tabindex="-1" 
                      aria-labelledby={`viewmessagemodalLabel-${message.id}`} 
                      aria-hidden="true"
                    >
                      <div className="modal-dialog border-danger">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`viewmessagemodalLabel-${message.id}`}> </h1>
                        
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" key={message.id} > 
                <div className="card-header fs-5 text-start">Name:  {message.name}</div>
                    <div className="card-header fs-5 text-start">Email:  {message.email}</div>
                    <div className="card-header fs-5 text-start">Subject: {message.subject}</div>
                    <div className="card-header fs-5 text-start">Date :   {message.date}</div>                  
                    
                    <div className="card-body">
                    <div className="card-header fs-5 text-start">Message :</div>                  
                    <p className="card-text">
                     {message.message}
                    </p>
                </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
                    <button className="btn ms-3 btn-danger" onClick={() => handleDeletemessage(message.id)}><i className="bi bi-trash3-fill"></i></button>
                    {messagedelete && <p className="notification">Message Deleted</p>}

         
           
              </div>
                </div>
            </div>
            </div>
                        </tr>

               ))}</tbody>
                </table>
                    </div>
                </div>

       









        </div>
    );
}

export default Messages;
