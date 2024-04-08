import { Link, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../backend/config/fire';
import { doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './customerdetails.css';



const AdminCustomerDetails = () => {

  


  const { id } = useParams();
  const [admincustomerlist, setAdminCustomerList] = useState(null);
  const [address, setAddress] = useState(null);


    function formatFirebaseTimestamp(timestamp) {
    if (timestamp && timestamp.toDate) {
      const dateObject = timestamp.toDate();
      return dateObject.toLocaleDateString(); 
    }
    return ''; 
  }

  
  const fetchData = async () => {
    const admincustomerlistRef = doc(db, 'customers', id);
    const admincustomerlistSnapshot = await getDoc(admincustomerlistRef);
    const admincustomerlistData = admincustomerlistSnapshot?.data();
    setAdminCustomerList(admincustomerlistData);

    const userRef = doc(db, 'customers', id);
    const addressCollectionRef = collection(userRef, 'address');
    const addressSnapshot = await getDocs(addressCollectionRef);
    const addressDocs = addressSnapshot.docs;
    const addressData = addressDocs.length > 0 ? addressDocs[0].data() : {};
    setAddress(addressData);

    // Log data to console for debugging
    console.log('admincustomerlist:', admincustomerlistData);
    console.log('addressSnapshot:', addressSnapshot);
    console.log('address:', addressData);
  };

  useEffect(() => {
    fetchData();
  }, []);




  return (
    <div>
     <Link style={{display:"flex", alignItems:"center"}} to="/admin/customers"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Customer Details</h3></Link> 

      {error && <div>{error.message}</div>}

      {/* Preloader */}
      {loading && <div className='preloader'>...Loading</div>}
        <div className='admin-customer-details-container'>
    
      {admincustomerlist && (
    <div className="admin-customer-details-container-inner"> 
      <img src={admincustomerlist.img} alt={admincustomerlist.name} />
      <div className="admin-customer-details-container-inner-description">
        <h2>{admincustomerlist.name}</h2>
         <p>{admincustomerlist.email}</p>
            </div>
             <button title="Send a mail to the users Email address">Send a Mail <i className="bi bi-envelope-at-fill"></i> </button> 
            </div> 
              )} 


            

        
      <nav>
        <div className="nav mt-5 nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="more-customer-details-tab" data-bs-toggle="tab" data-bs-target="#more-customer-details" type="button" role="tab" aria-controls="more-customer-details" aria-selected="true">More Details</button>
              <button className="nav-link ms-2" id="admin-customer-deilvery-info-tab" data-bs-toggle="tab" data-bs-target="#admin-customer-deilvery-info" type="button" role="tab" aria-controls="admin-customer-deilvery-info" aria-selected="false">Delivery Info</button>
              <button className="nav-link ms-2" id="admin-customer-orders-tab" data-bs-toggle="tab" data-bs-target="#admin-customer-orders" type="button" role="tab" aria-controls="admin-customer-orders" aria-selected="false">Orders</button>
           <button className="nav-link ms-2" id="admin-customer-activity-tab" data-bs-toggle="tab" data-bs-target="#admin-customer-activity" type="button" role="tab" aria-controls="admin-customer-activity" aria-selected="false">Activity</button>
             </div>
        </nav>




        <div className="tab-content p-4" id="nav-tabContent">

        {admincustomerlist && (
            <div className="tab-pane  admin-customer-more-details-tab fade show pt-4 active" id="more-customer-details" role="tabpanel" aria-labelledby="more-customer-details-tab" tabIndex="0">
                 <span className='d-flex mt-4 align-items-center'> <h6> UserName :</h6> <p className='mb-2 ms-3'> {admincustomerlist.userName} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Phone Number :</h6> <p className='mb-2 ms-3'> {admincustomerlist.phoneNumber} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Whatsapp Number :</h6> <p className='mb-2 ms-3'> {admincustomerlist.phoneNumber || admincustomerlist.whatsappNumber} </p> </span>
                 <span className='d-flex mt-4 align-items-center'><h6>Account Type :</h6> <p className='mb-2 ms-3'>{admincustomerlist.accountType}</p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Total Amount Spent : </h6><p className='mb-2 ms-3'>${admincustomerlist.amountspent} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Login Method : </h6><p className='mb-2 ms-3'>{admincustomerlist.loginmethod} </p> </span>
                <span className='d-flex mt-4 align-items-center'> <h6> Date Joined : </h6><p className='mb-2 ms-3'>{admincustomerlist.dateJoined} </p> </span>
                <span className='d-flex mt-4 align-items-center'> <h6> Ip : </h6><p className='mb-2 ms-3'>{admincustomerlist.userIP} </p> </span>
             </div>)} 

             {address && (
             <div className="tab-pane fade" id="admin-customer-deilvery-info" role="tabpanel" aria-labelledby="admin-customer-deilvery-info-tab" tabIndex="0">
             <span className='d-flex mt-4 align-items-center'> <h6> Delivery Name </h6> <p className='mb-2 ms-3'> {address.deliveryName} </p> </span>
                 <span className='d-flex mt-4 align-items-center'><h6>Delivery Email</h6> <p className='mb-2 ms-3'>{address.deliveryEmail}</p> </span>
                 <span className='d-flex mt-4 align-items-center'><h6>Delivery Phone Number :</h6> <p className='mb-2 ms-3'>{address.deliveryPhoneNumber}</p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Address Line One : </h6><p className='mb-2 ms-3'>{address.addressLineOne} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Address Line Two : </h6><p className='mb-2 ms-3'>{address.addressLineTwo} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> City : </h6><p className='mb-2 ms-3'>{address.city} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Region : </h6><p className='mb-2 ms-3'>{address.region} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Country : </h6><p className='mb-2 ms-3'>{address.country} </p> </span>
                 <span className='d-flex mt-4 align-items-center'> <h6> Zip : </h6><p className='mb-2 ms-3'>{address.zip} </p> </span>
                {/* <span className='d-flex mt-4 align-items-center'> <h6> Date Joined : </h6><p className='mb-2 ms-3'>{formatFirebaseTimestamp(address.dateUpdated)} </p> </span>    */}
            </div>)}


            <div className="tab-pane fade" id="admin-customer-orders" role="tabpanel" aria-labelledby="admin-customer-orders-tab" tabIndex="0">
                Orders
            </div>


            <div className="tab-pane fade" id="admin-customer-activity" role="tabpanel" aria-labelledby="admin-customer-activity-tab" tabIndex="0">
              Customers Activity
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

export default AdminCustomerDetails;
