import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, collection, getDocs, updateDoc, deleteDoc, increment } from 'firebase/firestore';
import { db } from '../../../backend/config/fire';
import './orderdetails.css'
import { toast } from 'react-toastify';



const AdminOrderDetails = () => {



  const { id, customerId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [orderedProducts, setOrderedProducts] = useState([]);
  // const [customerData, setCustomerData] = useState(null);
  const orderRef = doc(db, 'customers', customerId, 'orders', id);
  const [orderSnapshot] = useDocument(orderRef);
  const navigate = useNavigate();


  useEffect(() => {
  const fetchOrderedProducts = async () => {
    try {
      if (orderSnapshot && orderSnapshot.exists()) {
        const orderData = orderSnapshot.data();

        // Check if orderData is not null or undefined
        if (orderData) {
          setOrderData(orderData);

          // Fetch ordered products
          const productsRef = collection(orderRef, 'products');
          const productsSnapshot = await getDocs(productsRef);
          const productsData = productsSnapshot.docs.map((doc) => doc.data());
          setOrderedProducts(productsData);
        }
      }
    } catch (error) {
      console.error('Error fetching ordered products:', error.message);
    }
  };

  fetchOrderedProducts();
}, [orderSnapshot, id, customerId]);

  
  
  const totalForAllProducts = orderedProducts.reduce((accumulator, product) => {
    const unitQuantity = parseFloat(product.unitquantity) || 0;
    const weightQuantity = parseFloat(product.weightquantity) || 0;
    const price = parseFloat(product.productPrice) || 0;
  
    // Calculate total for each product
    const productTotal = (unitQuantity || weightQuantity) * price;
  
    // Accumulate the total for all products
    return accumulator + productTotal;
  }, 0);
  
const handleApproveOrder = async () => {
  try {
    // Assuming you have a db reference
    const orderRef = doc(db, 'customers', customerId, 'orders', id);

    // Get the ordered products
    const productsRef = collection(orderRef, 'products');
    const productsSnapshot = await getDocs(productsRef);
    const productsData = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Update the order status to "Approved"
    await updateDoc(orderRef, { orderStatus: 'Approved' });

    // Update the local state
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      orderStatus: 'Approved',
    }));

    // Update product documents in the "products" collection
    productsData.forEach(async (productSnapshot) => {
      const productDocRef = doc(db, 'products', productSnapshot.id);

      // Update the product document
        await updateDoc(productDocRef, {
        amountsold: increment(productSnapshot.unitquantity || productSnapshot.weightquantity),
        remaining: increment(-1 * (productSnapshot.unitquantity || productSnapshot.weightquantity)),
      });
    });
    toast.success('Order approved successfully');
  } catch (error) {
    toast.error('Error approving order');
    console.error('Error approving order:', error.message);
  }
};


  const handleDeleteOrder = async () => {
    try {
      // Assuming you have a db reference
      await deleteDoc(orderRef);
      toast.success('Order deleted successfully');
      navigate('/admin/orders'); 
    } catch (error) {
      toast.error('Error deleting order');
      console.error('Error deleting order:', error.message);
    }
  };




  // Function to format Firebase timestamp
  function formatFirebaseTimestamp(timestamp) {
    if (!timestamp || !timestamp.toDate || typeof timestamp.toDate !== 'function') {
      return "N/A"; // Or any default value you prefer
    }
  
    const dateObject = timestamp.toDate();
    return dateObject.toLocaleDateString(); // Adjust format as needed
  }
  



  return (
    <div>
    <Link style={{display:"flex", alignItems:"center",width:"fit-content"}} to="/tfghjkdyfrgehrtkmebvgc4k6lm54j3hgvfc46kl54m3jh2gfd3gh4jk5l6k5j4hb3gf2dfg3hj4k5l/admin/orders"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Order Details</h3></Link> 
       
     {/* {error && <div>{error.message}</div>} */}

     {/* Preloader */}
     {/* {loading && <div className='preloader'>...Loading</div>} */}
       <div className='admin-order-details-container'>
   
     {orderData && (
   <div className="admin-order-details-container-inner"> 
     <div className="admin-order-details-container-inner-description">
       <h2>Order Number : {orderData.orderNumber}</h2>
       </div>
        <span> <h6> Order Date : <i className="bi bi-calender-week-fill"></i> </h6><p className='mb-3'>{formatFirebaseTimestamp(orderData.orderDate)} </p> </span>
           
            {/* <button title="Send a mail to the users Email address">Send a Mail <i className="bi bi-envelope-at-fill"></i> </button>  */}
           </div> 
             )}  
       


           

       
       <nav>
       <div className="nav mt-5 nav-tabs" id="nav-tab" role="tablist">
           <button className="nav-link active" id="ordered-product-tab" data-bs-toggle="tab" data-bs-target="#ordered-product" type="button" role="tab" aria-controls="ordered-product" aria-selected="true">Order <i className="bi bi-diagram-3-fill"></i> </button>
           <button className="nav-link ms-2" id="payment-details-activity-tab" data-bs-toggle="tab" data-bs-target="#payment-details-activity" type="button" role="tab" aria-controls="payment-details-activity" aria-selected="false">Payment <i className="bi bi-cash-stack"></i> </button>
           <button className="nav-link ms-2" id="location-details-activity-tab" data-bs-toggle="tab" data-bs-target="#location-details-activity" type="button" role="tab" aria-controls="location-details-activity" aria-selected="false">Location <i className="bi bi-geo-alt-fill"></i> </button>
           <button className="nav-link ms-2" id="customer-details-activity-tab" data-bs-toggle="tab" data-bs-target="#customer-details-activity" type="button" role="tab" aria-controls="customer-details-activity" aria-selected="false">Customer Details <i className="bi bi-person-lines-fill"></i> </button>
         

         {/* Alternatively, if you want to display different messages for different statuses */}
         {orderData && (
         <div className='ms-auto d-flex align-items-center mt-2'>
           <p className='me-2'> Order Status:</p>
          {orderData.orderStatus === 'pending' && <p className=' mb-3 text-danger'>
              {orderData.orderStatus}
           </p>} 
           {orderData.orderStatus === 'Approved' && <p className=' mb-3 text-success'>
             {orderData.orderStatus}
           </p>} 
         </div>
         )} </div>
         
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
                       {orderedProducts.map((orderedproduct, index) => (                      
                           <tr key={index}>
                           <td>{orderedproduct.productStockNumber}</td>
                           <td><img src={orderedproduct.productImage[0] || orderedproduct.productImage } className='rounded me-2' height="35px" width="40px" alt="" />{orderedproduct.productTitle}</td>
                           <td> $ {orderedproduct.productPrice} </td>
                          <td>x {orderedproduct.unitquantity || orderedproduct.weightquantity} {orderedproduct.productWeightType} </td>
                           <td> $ {(orderedproduct.unitquantity || orderedproduct.weightquantity )  * (orderedproduct.productPrice)}  </td>
                       </tr> 
                         ))}
                       </tbody>

                     </table>
                               
               </div>


           <div className="tab-pane fade payment-details-activity" id="payment-details-activity" role="tabpanel" aria-labelledby="payment-details-activity-tab" tabIndex="0">

             <h4>Payment Summary</h4>

             {orderData && ( <table>

             <tbody>
             <tr>
                 <td>Payment Method</td>
                 <td></td>
                 <td>{orderData.paymentMethod}</td>
             </tr> 
                   
                <tr>
                 <td>Subtotal</td>
                 <td></td>
                 <td>$ {totalForAllProducts}</td>
             </tr>


           
                     
             <tr>
                 <td>Delivery Fee</td>
                 <td> </td>
                <td>$ {orderData.deliveryFee}</td>
             </tr>
             <tr>
                 <td>Total</td>
                 <td></td>
                 <td> $ {totalForAllProducts + parseInt(orderData.deliveryFee) } </td>
             </tr>

             </tbody>

             </table> )}



           </div>      
           
            <div className="tab-pane  location-details-activity fade" id="location-details-activity" role="tabpanel" aria-labelledby="location-details-activity-tab" tabIndex="0">

             <table>
             {orderData && (
               <tbody>
                       <tr>
                       <td>Address Line 1</td>
                   <td>{orderData.addressLineOne}</td>
               </tr> 


               <tr>                  
                 <td>Address Line 2</td>
                   <td>{orderData.addressLineTwo}</td>                
                   </tr> 

                   

               <tr>
                   <td>Town / City</td>
                   <td>{orderData.city}</td>
               </tr> 

               <tr>
                   <td>State</td>
                   <td>{orderData.region}</td>
               </tr> 


               <tr>
                   <td>Country</td>
                   <td>{orderData.country}</td>
               </tr> 

               <tr>
                   <td>Zip Code</td>
                   <td>{orderData.zip}</td>
               </tr> 
               </tbody>)}

           </table>



           </div>

           <div className="tab-pane fade" id="customer-details-activity" role="tabpanel" aria-labelledby="customer-details-activity-tab" tabIndex="0">
      

           <div className='admin-customer-details-container location-details-activity d-flex'>
     
           <table>
             {orderData && (
               <tbody>
                       <tr>
                       <td>Name</td>
                   <td>{orderData.deliveryName}</td>
               </tr> 


               <tr>                  
                 <td>Email</td>
                   <td>{orderData.deliveryEmail}</td>                
                   </tr> 

                   

               <tr>
                   <td>Phone Number</td>
                   <td>{orderData.deliveryPhoneNumber}</td>
               </tr> 


               <tr>
                   <td> <Link to={`/tfghjkdyfrgehrtkmebvgc4k6lm54j3hgvfc46kl54m3jh2gfd3gh4jk5l6k5j4hb3gf2dfg3hj4k5l/admin/customers/${orderData.customerId}`}> View Profile</Link> </td>
               </tr> 
               </tbody>)}

           </table>

             

           

           </div>





      
           </div>

   
       </div>



<div className='d-flex'>

<button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
Delete Order
</button>

{orderData && (
   <div>
      {orderData.orderStatus === 'pending' &&
           <button className="btn ms-4 btn-primary" onClick={handleApproveOrder}> Approve Order</button>         
      } 
         </div>)}</div>
         


     <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div className="modal-dialog modal-dialog-centered">
       <div className="modal-content">
         <div className="modal-header">
           <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Order</h1>
           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div className="modal-footer">
           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button
           type='button'
           className='btn-primary'
           title="Delete Order"
           onClick={handleDeleteOrder}
         >
           Delete Order
         </button>
         </div>
       </div>
     </div>
     </div>




</div>



   </div>
  );
};

export default AdminOrderDetails;
