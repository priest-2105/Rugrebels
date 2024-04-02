import React, { useEffect, useState } from 'react';
import './orders.css';
import { db } from '../../../backend/config/fire';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';


const RecentOrders = () => {

  const [ allordersadmin, setAllordersadmin ] = useState([]);
    const currentMonth = new Date().getMonth(); // Geting the current month (0-indexed)
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const monthsToShow = months.slice(Math.max(currentMonth - 3, 0), currentMonth);  
     const [searchTerm, setSearchTerm] = useState('');
    const [filteredAllordersadmin, setFilteredAllordersadmin] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [sortField, setSortField] = useState(null);
   
  
  
  
      const handleChangeMonth = (event) => {
        setSelectedMonth(event.target.value);
    }



    function formatFirebaseTimestamp(timestamp) {
        const dateObject = timestamp.toDate();
        return dateObject.toLocaleDateString(); // Adjust format as needed
      }
      
    
        useEffect(() => {
            const fetchallordersadmin = async () => {
              const allordersadminCollection = collection(db, 'allordersadmin');
              const snapshot = await getDocs(allordersadminCollection);
              const allordersadminData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setAllordersadmin(allordersadminData);
            };
        
            fetchallordersadmin();
          }, []);

          
    

        //   for displaying timestamp 
    function formatFirebaseTimestamp(timestamp) {
        const dateObject = timestamp.toDate();
        return dateObject.toLocaleDateString(); // Adjust format as needed
    }
        
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
          const orderRef = doc(db, 'allordersadmin', orderId);
          await updateDoc(orderRef, {
            status: newStatus,
          });
        } catch (error) {
          console.error('Error updating order status:', error);
        }
      };
      
    
    const handleApproveOrder = async (orderId) => {
        try {
          await updateOrderStatus(orderId, 'Delivered');
          // Update the state with the new data after the status change
          setAllordersadmin(prevOrders => 
            prevOrders.map(order => 
              order.id === orderId ? {...order, status: 'Delivered'} : order
            )
          );
        } catch (error) {
          console.error('Error approving order:', error);
        }
      };
      



  useEffect(() => {
    const filtered = allordersadmin.filter(ordersadmin => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      return (
      ( ordersadmin.name  &&  ordersadmin.name.toLowerCase().includes(lowerCaseTerm)) ||
      ( ordersadmin.email  &&  ordersadmin.email.toLowerCase().includes(lowerCaseTerm)) ||
      ( ordersadmin.itembought  &&  ordersadmin.itembought.toLowerCase().includes(lowerCaseTerm)) || 
      ( ordersadmin.address  &&  ordersadmin.address.toLowerCase().includes(lowerCaseTerm)) || 
      ( ordersadmin.status &&  ordersadmin.status.toLowerCase().includes(lowerCaseTerm)) || 
      ( ordersadmin.phonenumber  &&  ordersadmin.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
      ( ordersadmin.price  &&  ordersadmin.price.toLowerCase().includes(lowerCaseTerm)) ||
      ( ordersadmin.date  &&  ordersadmin.date.toString().toLowerCase().includes(lowerCaseTerm))

        // Add more checks as needed
      );
    });
    setFilteredAllordersadmin(filtered);
    setShowResults(true); // Show results after initializing
}, [searchTerm, allordersadmin]);


const handleInputChange = (e) => {
  const term = e.target.value;
  setSearchTerm(term);

  const filtered = allordersadmin.filter(ordersadmin => {
    const lowerCaseTerm = term.toLowerCase();
    return (
    ( ordersadmin.name  &&  ordersadmin.name.toLowerCase().includes(lowerCaseTerm)) ||
    ( ordersadmin.email  &&  ordersadmin.email.toLowerCase().includes(lowerCaseTerm)) ||
    ( ordersadmin.itembought  &&  ordersadmin.itembought.toLowerCase().includes(lowerCaseTerm)) || 
    ( ordersadmin.address  &&  ordersadmin.address.toLowerCase().includes(lowerCaseTerm)) || 
    ( ordersadmin.status &&  ordersadmin.status.toLowerCase().includes(lowerCaseTerm)) || 
    ( ordersadmin.phonenumber  &&  ordersadmin.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
    ( ordersadmin.price  &&  ordersadmin.price.toLowerCase().includes(lowerCaseTerm)) ||
    ( ordersadmin.date  &&  ordersadmin.date.toString().toLowerCase().includes(lowerCaseTerm)) 
      );
  });

  setFilteredAllordersadmin(filtered);
  setShowResults(true); // Show results when there is a search term
};



      // table sorting      
    
  const [sortOrder, setSortOrder] = useState({
    name: null,
    price: null,
    date: null
  });
      

  const [filterOptions, setFilterOptions] = useState({
    dateRange: {
      startDate: null,
      endDate: null,
    },
    priceRange: {
      minPrice: null,
      maxPrice: null,
    },
    status: {
      inStock: false,
      outOfStock: false,
      notActive: false,
    },
  });
  

      

    const [sortConfig, setSortConfig] = useState({ field: null, order: 'asc' });

    const handleSort = (field) => {
      let order = 'asc';
      if (sortConfig.field === field && sortConfig.order === 'asc') {
        order = 'desc';
      }
      setSortConfig({ field, order });
    
      const sortedAllordersadmin = [...filteredAllordersadmin].sort((a, b) => {
        if (field === 'name') {
          return a.name.localeCompare(b.name);
        } else if (field === 'date') {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
    
      if (order === 'desc') {
        sortedAllordersadmin.reverse();
      }
    
      setFilteredAllordersadmin(sortedAllordersadmin);
    };
    
  
   
  
  
  useEffect(() => {
    // Sorting logic based on sortOrder
    const sortedAllordersadmin = [...allordersadmin].sort((a, b) => {
      if (sortOrder.name) {
        return sortOrder.name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortOrder.date) {
        return sortOrder.date === 'asc' ? Date.parse(a.date) - Date.parse(b.date) : Date.parse(b.date) - Date.parse(a.date);
      }      
      return 0; // No sorting applied
    });

    setFilteredAllordersadmin(sortedAllordersadmin);
  }, [allordersadmin, sortOrder]);
 
   


      // end of table sorting config 






    return (
        <div>

     <div className="recent-customers-container" style={{minHeight:"500px"}}>

        <div className="recent-customers">

          <div className="recent-customer-header d-flex mb-5">
            <h3>Recent Orders</h3>

            <div style={{
              marginLeft:'auto',
            position: 'relative',
            display: 'inline-block'
        }}>
            <input
                type="text"
                placeholder="Search..."
                 value={searchTerm}
            onChange={handleInputChange}
                style={{
                    padding: '8px 10px', 
                    borderRadius: '8px',
                    border: '2px solid aliceblue',
                    backgroundColor: 'transparent',
                    width: '200px',
                    color:'aliceblue',
                    boxSizing: 'border-box',
                    outline: 'none'
                }}
            />
            <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" >
                    <path fillRule="evenodd"d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.027.045.055.088.086.13l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.087-.13zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>
        </div>


          </div>

    
           <table>

            <tr>
            <th> <button onClick={() => handleSort('name')}> Reciever <i className="bi-arrow-down-up"></i></button>  </th>
            <th> <button onClick={() => handleSort('name')}> Item Bought <i className="bi-arrow-down-up"></i></button></th>
            <th> <button onClick={() => handleSort('name')}>Satus <i className="bi-arrow-down-up"></i></button>  </th>
            <th> <button onClick={() => handleSort('date')}> Date<i className="bi-arrow-down-up"></i></button>  </th>
            <th> <button onClick={() => handleSort('price')}> Amount<i className="bi-arrow-down-up"></i></button> </th>  
            <th>Actions </th>
         </tr>

                <tbody>
        {filteredAllordersadmin
            .sort((a, b) => b.date - a.date) // Sort orders by date in descending order
            .slice(0, 10) // Get the first 10 orders
            .map((ordersadmin) => (
            <tr key={ordersadmin.id}>
                <td>
                <img src={ordersadmin.userimage} className='rounded me-2' height="30px" width="30px" alt="" />
                {ordersadmin.name}
                </td>
                <td>{ordersadmin.itembought}</td>
                <td>
                {ordersadmin.status === 'Pending' ? (
                    <span className='rounded-pill pending'>{ordersadmin.status}</span>
                ) : (
                    <span className='rounded-pill success'>{ordersadmin.status}</span>
                )}
                </td>
                <td>{formatFirebaseTimestamp(ordersadmin.date)}</td>
                <td>{ordersadmin.price}</td>
                <td>
                <Link to={`/admin/adminorderdetails/${ordersadmin.id}`}> View Info</Link>
                </td>
            </tr>
            ))}
        </tbody>


             </table>

                </div>
        </div>






                        
                      {/* view Order Modal */}
                    {filteredAllordersadmin.map((ordersadmin) =>(  <div 
                        className="modal fade" 
                        id={`viewordersadminmodal-${ordersadmin.id}`} 
                        tablndex="-1" 
                        aria-labelledby={`viewordersadminmodalLabel-${ordersadmin.id}`} 
                        aria-hidden="true"
                      >
                        <div className="modal-dialog border-danger">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id={`viewordersadminmodalLabel-${ordersadmin.id}`}> </h1>
                          
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body" key={ordersadmin.id} > 
                  <div className="card-header fs-5 text-start"><img src={ordersadmin.userimage} alt="" />  </div>
                  <div className="card-header fs-5 text-start">Reciever:  {ordersadmin.name}</div>
                      <div className="card-header fs-5 text-start">Price:  {ordersadmin.price}</div>
                      <div className="card-header fs-5 text-start">Email:  {ordersadmin.email}</div>
                      <div className="card-header fs-5 text-start">Phone Number:  {ordersadmin.phonenumber}</div>
                      <div className="card-header fs-5 text-start">Status:  {ordersadmin.status === 'delivered' ? (
                            <span className='rounded-pill success'>{ordersadmin.status}</span>
                          ) : (
                            <span className='rounded-pill pending'>{ordersadmin.status}</span>
                          )}</div> 
                      <div className="card-header fs-5 text-start">Subject: {ordersadmin.itembought}</div>
                      <div className="card-header fs-5 text-start">Date:  {formatFirebaseTimestamp(ordersadmin.date)}</div>
                       {/* <div className="card-header fs-5 text-start">Date :   {ordersadmin.date}</div>                   */}
                      
                      <div className="card-body">
                      <div className="card-header fs-5 text-start">Address :</div>                  
                      <p className="card-text">
                       {ordersadmin.address}
                      </p>
                  </div>
  
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
                      <button className="btn ms-3 btn-danger" 
                      onClick={() => handleApproveOrder(ordersadmin.id)}
                      >Approve Order</button>
                     
             
                </div>
                  </div>
              </div>
              </div>))}




        </div>
    );
}

export default RecentOrders;                     