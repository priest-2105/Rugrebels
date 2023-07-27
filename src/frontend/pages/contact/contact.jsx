import React from 'react'; 
import './contact.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../../assets/hooks/usefetch';

const Contact = () => { 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");   
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [sent, setSent] = useState(false); // new state for tracking if the painting is being added

  const smile = ":)"
  

  const history = useHistory(); // add this line to use useHistory hook

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newMessage = { name, email, subject, message, date };
    setSent(false); // set sent to false before sending the request
    fetch("https://rugrebelsdb.onrender.com/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    })
      .then(() => {
        console.log("Message Sent");
        setSent(true);
        setTimeout(() => {
          setSent(false);
        }, 3000); 
        history.push("/contact");
      })
      .catch((error) => {
        setSent(false); // set sent to false if there was an error
        console.error(error);
      });
  };
    
  
  return (
        <div>
            
 
<div className="contact">

<div className="map">
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7926.975880214083!2d3.3440181956176573!3d6.586106741070622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b921ffae3b2c3%3A0x20bd2789bdec4e5e!2sArchdeacon%20Ogunbiyi!5e0!3m2!1sen!2sng!4v1678912496100!5m2!1sen!2sng" width="100%" height="100%" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

</div>

<div className="enquiries">
<h4>PERRYACE</h4>
<p> NO 123 Time Square LN New York, United States </p>

<li>Preeyace@gmail.com</li>
<li>Tel : +2349012914046</li>
<li>Tel : +2349012914046</li> 
</div>


<div>
  
{/* {preloader && <div className="preloader">...Loading </div>} */}
  
  

  <form className="quickletter" onSubmit={handleSubmit}>
  <h2>Say Hi To Us {smile}</h2>
   <input
    placeholder='Full Name'
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

 
  <input 
    required
    placeholder='Email'
    type="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

 
  <input
   placeholder='Subject'
    required
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
  />

 
  <textarea
   placeholder='Message'
    type="message"
    required
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />

   <input
    className='d-none'
    type="date"
    required
    value={date}
    onChange={(e) => setDate(e.target.value)}
  />

  <button disabled={sent} type="submit"> Send message <i className="bi bi-send-fill"></i></button>
     {sent && <p className="notification" >Message Sent <i className="bi bi-send-check-fill"></i></p>} {/* display a message while the painting is being added */}
     
</form>



</div>

</div>

 
        </div>
    );
}

export default Contact;
