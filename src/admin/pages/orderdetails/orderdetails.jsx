import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../backend/config/fire'; 
import { getFirestore } from 'firebase/firestore';
import { collection, doc, getDocs, query, where, getDoc, FieldPath } from 'firebase/firestore';
import './orderdetails.css'



const AdminOrderDetails = () => {


const { id } = useParams();
const [orderedproducts, setOrderedproducts] = useState([]);


// Get the admincustomerlist document reference
const admincustomerlistRef = doc(db, 'admincustomerlist', id);

// Use the react-firebase-hooks to fetch the admincustomerlist document
const [admincustomerlistSnapshot, loading, error] = useDocument(admincustomerlistRef);

// Extract admincustomerlist data from the snapshot
const admincustomerlist = admincustomerlistSnapshot?.data();


// Date and time 
const formatFirebaseTimestamp = (timestamp) => {
  const dateObject = timestamp.toDate(); // Convert Firebase timestamp to JavaScript Date object

  // Get date components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = dateObject.getDate().toString().padStart(2, '0');

  // Get time components
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');

  // Construct the formatted string
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
};




  // Get the allordersadmin document reference
  const allordersadminRef = doc(db, 'allordersadmin', id);

  // Use the react-firebase-hooks to fetch the allordersadmin document
  const [allordersadminSnapshot] = useDocument(allordersadminRef);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalquantity, setTotalquantity] = useState(0);
  // Extract allordersadmin data from the snapshot
  const allordersadmin = allordersadminSnapshot?.data();



   // fetch ordered products 
   useEffect(() => {
    const orderedproductsRef = collection(db, 'allordersadmin', id, 'orderedproduct');
  
    // Fetch the documents in the subcollection
    getDocs(orderedproductsRef)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        setOrderedproducts(data); // Set the state with the fetched data
        const total = data.reduce((acc, orderedproduct) => {
        return acc + calculateTotalproductprice(orderedproduct.quantity, orderedproduct.price);
      }, 0);

      const totalquant = data.reduce((acc, orderedproducts) => {
        return acc + parseInt(orderedproducts.quantity);
      }, 0);

      setTotalAmount(total);
      setTotalquantity(totalquant);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error.message);
      });

  }, [id, db]);


  const calculateTotalproductprice = (quantity, price) => {
    return quantity * price;
  };






const [customerData, setCustomerData] = useState(null);

useEffect(() => {
  if (allordersadmin && allordersadmin.orderdetailuserid) {
    const customerRef = doc(db, 'admincustomerlist', allordersadmin.orderdetailuserid);

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
}, [allordersadmin]);

  


  return (
    <div>
     <Link style={{display:"flex", alignItems:"center",width:"fit-content"}} to="/admin/orders"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Order Details</h3></Link> 
        
      {error && <div>{error.message}</div>}

      {/* Preloader */}
      {loading && <div className='preloader'>...Loading</div>}
        <div className='admin-order-details-container'>
    
      {allordersadmin && (
    <div className="admin-order-details-container-inner"> 
      <div className="admin-order-details-container-inner-description">
        <h2>Order Number #DF345</h2>
         </div>
         <span> <h6> Order Date : <i className="bi bi-calender-week-fill"></i> </h6><p>{formatFirebaseTimestamp(allordersadmin.date)} </p> </span>
            
             {/* <button title="Send a mail to the users Email address">Send a Mail <i className="bi bi-envelope-at-fill"></i> </button>  */}
            </div> 
              )} 


            

        
        <nav>
        <div className="nav mt-5 nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="ordered-product-tab" data-bs-toggle="tab" data-bs-target="#ordered-product" type="button" role="tab" aria-controls="ordered-product" aria-selected="true">Order <i className="bi bi-diagram-3-fill"></i> </button>
            <button className="nav-link ms-2" id="payment-details-activity-tab" data-bs-toggle="tab" data-bs-target="#payment-details-activity" type="button" role="tab" aria-controls="payment-details-activity" aria-selected="false">Payment <i className="bi bi-cash-stack"></i> </button>
            <button className="nav-link ms-2" id="location-details-activity-tab" data-bs-toggle="tab" data-bs-target="#location-details-activity" type="button" role="tab" aria-controls="location-details-activity" aria-selected="false">Location <i className="bi bi-geo-alt-fill"></i> </button>
            <button className="nav-link ms-2" id="customer-details-activity-tab" data-bs-toggle="tab" data-bs-target="#customer-details-activity" type="button" role="tab" aria-controls="customer-details-activity" aria-selected="false">Customer Details <i className="bi bi-person-lines-fill"></i> </button>
            </div>
        </nav>




        <div className="tab-content p-4" id="nav-tabContent">
                <div className="tab-pane  order-details-more-details-tab fade show pt-4 active" id="ordered-product" role="tabpanel" aria-labelledby="ordered-product-tab" tabIndex="0">
                  
                      <table>

                        <tr>
                        <th> Stock Number</th>
                        <th> Items </th>
                        <th> Price</th>
                        <th> Quantity</th>
                        <th> Total</th> 
                        </tr>

                        <tbody>
                        {orderedproducts.map((orderedproduct, index) => (                      
                            <tr key={index}>
                            <td>{orderedproduct.stockNumber}</td>
                            <td><img src={orderedproduct.img} className='rounded me-2' height="35px" width="40px" alt="" />{orderedproduct.name}</td>
                            <td> {orderedproduct.price} </td>
                           <td>x {orderedproduct.quantity}</td>
                            <td>{calculateTotalproductprice(orderedproduct.quantity, orderedproduct.price)}  </td>
                        </tr> 
                          ))}
                        </tbody>

                      </table>
                                
                </div>


            <div className="tab-pane fade payment-details-activity" id="payment-details-activity" role="tabpanel" aria-labelledby="payment-details-activity-tab" tabIndex="0">

              <h4>Payment Summary</h4>

             <table>

              <tbody>
                      <tr>
                  <td>Subtotal</td>
                  <td>{totalquantity} items</td>
                  <td>$ {totalAmount}</td>
              </tr> 


              {allordersadmin && (
                      
              <tr>
                  <td>Delivery Fee</td>
                  <td> </td>
                 <td>$ {allordersadmin.deliveryfee}</td>
              </tr>)}



              {allordersadmin && (
              <tr>
                  <td>Total</td>
                  <td></td>
                  <td>$ {totalAmount + parseInt(allordersadmin.deliveryfee) } </td>
              </tr> )}

              </tbody>

              </table>



            </div>      
            
             <div className="tab-pane  location-details-activity fade" id="location-details-activity" role="tabpanel" aria-labelledby="location-details-activity-tab" tabIndex="0">

              <table>

              {allordersadmin && (
                <tbody>
                        <tr>
                        <td>Address Line 1</td>
                    <td>{allordersadmin.addresslineone}</td>
                </tr> 


                <tr>                  
                  <td>Address Line 2</td>
                    <td>{allordersadmin.addresslinetwo}</td>                
                    </tr> 

                    

                <tr>
                    <td>Town / City</td>
                    <td>{allordersadmin.city}</td>
                </tr> 

                <tr>
                    <td>State</td>
                    <td>{allordersadmin.state}</td>
                </tr> 


                <tr>
                    <td>Country</td>
                    <td>{allordersadmin.country}</td>
                </tr> 
                </tbody>)}

            </table>



            </div>

            <div className="tab-pane fade" id="customer-details-activity" role="tabpanel" aria-labelledby="customer-details-activity-tab" tabIndex="0">
       

            <div className='admin-customer-details-container'>
      
     {customerData && (
     <div className="admin-customer-details-container-inner"> 
      <img src={customerData.img} alt={customerData.name} />
      <div className="admin-customer-details-container-inner-description">
        <h2>{customerData.name}</h2>
         <p>{customerData.email}</p>
         <span> <h6> Total Amount Spent : </h6><p>{customerData.amountspent} </p> </span>

            </div>
            {allordersadmin && (
              <div className='admin-customer-details-container-innerbutton-container'>  <Link to={`/admin/admincustomerdetails/${allordersadmin.orderdetailuserid}`} title="View Customer Profile">View Profile </Link>  </div> 
              )}</div> )}

              

            

            </div>





       
            </div>

    
        </div>


 <button className='btn-danger delete-order-button' title="Deacivate User">Delete Order </button>

  </div>

  







    </div>
  );
};

export default AdminOrderDetails;
