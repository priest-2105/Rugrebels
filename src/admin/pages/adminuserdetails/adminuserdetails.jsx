import { Link, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../backend/config/fire';
import { doc, getDoc } from 'firebase/firestore';  
// import axios from 'axios';



const AdminUserDetails = () => {
  const { id } = useParams();

  // Get the adminuserlist document reference
  const adminuserlistRef = doc(db, 'admins', id);

  // Use the react-firebase-hooks to fetch the adminuserlist document
  const [adminuserlistSnapshot, loading, error] = useDocument(adminuserlistRef);

  // Extract adminuserlist data from the snapshot
  const adminuserlist = adminuserlistSnapshot?.data();

 


      // const [subject, setSubject] = useState('');
      // const [message, setMessage] = useState('');

      // const sendEmail = () => {
      //   axios.post(
      //     'YOUR_CLOUD_FUNCTION_URL', 
      //     { to: adminuserlist.email, subject, text: message }
      //   )
      //   .then(response => {
      //     console.log(response.data);
      //     // Handle success
      //   })
      //   .catch(error => {
      //     console.error(error);
      //     // Handle error
      //   });
      // };

  

  return (
    <div>
     <Link style={{display:"flex", alignItems:"center"}} to="/admin/settings"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Admin Details</h3></Link> 

      {error && <div>{error.message}</div>}

      {/* Preloader */}
      {loading && <div className='preloader'>...Loading</div>}
        <div className='admin-customer-details-container'>
    
      {adminuserlist && (
    <div className="admin-customer-details-container-inner"> 
      <img src={adminuserlist.img} alt={adminuserlist.name} />
      <div className="admin-customer-details-container-inner-description">
        <h2>{adminuserlist.name}</h2>
         <p>{adminuserlist.email}</p>
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

            {adminuserlist && (
            <div className="tab-pane  admin-customer-more-details-tab fade show pt-4 active" id="more-customer-details" role="tabpanel" aria-labelledby="more-customer-details-tab" tabIndex="0">
               {adminuserlist.phonenumber &&  <span> <h6> Phone Number :</h6> <p> {adminuserlist.phonenumber} </p> </span>}
               {adminuserlist.loation &&  <span><h6>Address :</h6> <p>{adminuserlist.location}</p> </span>}
               {adminuserlist.phonenumber &&   <span> <h6> Total Amount Spent : </h6><p>${adminuserlist.amountspent} </p> </span> }
             </div>)} 


            <div className="tab-pane fade" id="admin-customer-activity" role="tabpanel" aria-labelledby="admin-customer-activity-tab" tabIndex="0">
               User Activity
            </div>



        </div>


 <button className='btn-danger delete-customer-button' title="Deacivate User">Deacivate User </button>

  </div>

  



  {/* <div>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={sendEmail}>Send Email</button>
    </div> */}






    </div>
  );
};

export default AdminUserDetails;
