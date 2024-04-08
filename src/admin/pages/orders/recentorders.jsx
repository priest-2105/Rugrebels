import { useEffect, useState } from 'react';
import { db } from '../../../backend/config/fire';
import { collection, getDocs, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './orders.css'



const RecentOrders = () => {


  
  const [ allordersadmin, setAllordersadmin ] = useState([]);
  const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const monthsToShow = months.slice(Math.max(currentMonth - 3, 0), currentMonth);  
   const [searchTerm, setSearchTerm] = useState('');
  const [filteredAllordersadmin, setFilteredAllordersadmin] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
 



    const handleChangeMonth = (event) => {
      setSelectedMonth(event.target.value);
  }




    
  
      // useEffect(() => {
      //     const fetchallordersadmin = async () => {
      //       const allordersadminCollection = collection(db, 'allordersadmin');
      //       const snapshot = await getDocs(allordersadminCollection);
      //       const allordersadminData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      //       setAllordersadmin(allordersadminData);
      //     };
      
      //     fetchallordersadmin();
      //   }, []);

      useEffect(() => {
        const fetchAllOrdersAdmin = async () => {
          try {
            const customersCollectionRef = collection(db, 'customers');
            const customersSnapshot = await getDocs(customersCollectionRef);
      
            const allOrders = [];
      
            for (const customerDoc of customersSnapshot.docs) {
              const customerId = customerDoc.id;
              const ordersCollectionRef = collection(customersCollectionRef, customerId, 'orders');
              const ordersSnapshot = await getDocs(query(ordersCollectionRef));
      
              const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              allOrders.push(...ordersData);
            }
      
            setAllordersadmin(allOrders);
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
      
        fetchAllOrdersAdmin();
      }, []);
  
        

        
  

      //   for displaying timestamp 
      function formatFirebaseTimestamp(timestamp) {
        if (!timestamp || !timestamp.toDate || typeof timestamp.toDate !== 'function') {
          return "N/A"; // Or any default value you prefer
        }
      
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
     ( ordersadmin.deliveryName && ordersadmin.deliveryName.toLowerCase().includes(lowerCaseTerm))||
     ( ordersadmin.email && ordersadmin.email.toLowerCase().includes(lowerCaseTerm))||
     ( ordersadmin.orderNumber && ordersadmin.orderNumber.toLowerCase().includes(lowerCaseTerm)) || 
    //  ( ordersadmin.address && ordersadmin.address.toLowerCase().includes(lowerCaseTerm)) || 
      ( ordersadmin.orderStatus && ordersadmin.orderStatus.toLowerCase().includes(lowerCaseTerm)) || 
    //  ( ordersadmin.phonenumber && ordersadmin.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
      ( ordersadmin.price && ordersadmin.price.toLowerCase().includes(lowerCaseTerm)) ||
     ( ordersadmin.orderDate && ordersadmin.orderDate.toString().toLowerCase().includes(lowerCaseTerm)) 
    );
  });
  setFilteredAllordersadmin(filtered);
  setShowResults(true); // Show results after initializing
}, [searchTerm, allordersadmin]);
const totalOrders = allordersadmin.length;


const [pendingOrdersCount, setPendingOrdersCount] = useState(0);


useEffect(() => {
const fetchPendingOrdersCount = async () => {
  try {
    const customersCollectionRef = collection(db, 'customers');
    const customersSnapshot = await getDocs(customersCollectionRef);

    let pendingCount = 0;

    for (const customerDoc of customersSnapshot.docs) {
      const customerId = customerDoc.id;
      const ordersCollectionRef = collection(customersCollectionRef, customerId, 'orders');
      const pendingOrdersQuery = query(ordersCollectionRef, where('orderStatus', '==', 'pending'));

      const pendingOrdersSnapshot = await getDocs(pendingOrdersQuery);
      pendingCount += pendingOrdersSnapshot.size;
    }

    setPendingOrdersCount(pendingCount);
  } catch (error) {
    console.error('Error fetching pending orders count:', error);
  }
};

fetchPendingOrdersCount();
}, []);




useEffect(() => {
const fetchDeliveredOrdersCount = async () => {
  try {
    const customersCollectionRef = collection(db, 'customers');
    const customersSnapshot = await getDocs(customersCollectionRef);

    let DeliveredCount = 0;

    for (const customerDoc of customersSnapshot.docs) {
      const customerId = customerDoc.id;
      const ordersCollectionRef = collection(customersCollectionRef, customerId, 'orders');
      const DeliveredOrdersQuery = query(ordersCollectionRef, where('orderStatus', '==', 'Approved'));

      const DeliveredOrdersSnapshot = await getDocs(DeliveredOrdersQuery);
      DeliveredCount += DeliveredOrdersSnapshot.size;
    }

    setDeliveredOrdersCount(DeliveredCount);
  } catch (error) {
    console.error('Error fetching Delivered orders count:', error);
  }
};

fetchDeliveredOrdersCount();
}, []);



const handleInputChange = (e) => {
const term = e.target.value;
setSearchTerm(term);

const filtered = allordersadmin.filter(ordersadmin => {
  const lowerCaseTerm = term.toLowerCase();
  return (
   ( ordersadmin.deliveryName && ordersadmin.deliveryName.toLowerCase().includes(lowerCaseTerm)) ||
   ( ordersadmin.email && ordersadmin.email.toLowerCase().includes(lowerCaseTerm)) ||
   ( ordersadmin.orderNumber && ordersadmin.orderNumber.toLowerCase().includes(lowerCaseTerm)) || 
  //  (ordersadmin.address &&  ordersadmin.address.toLowerCase().includes(lowerCaseTerm)) || 
   ( ordersadmin.orderStatus && ordersadmin.orderStatus.toLowerCase().includes(lowerCaseTerm)) || 
  //  ( ordersadmin.phonenumber && ordersadmin.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
    ( ordersadmin.price && ordersadmin.price.toLowerCase().includes(lowerCaseTerm)) ||
   ( ordersadmin.orderDate && ordersadmin.orderDate.toString().toLowerCase().includes(lowerCaseTerm)) 
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

   
<div className="recent-customers-container" style={{minHeight:"600px"}}>

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
            border: '2px solid grey',
            backgroundColor: 'transparent',
            width: '200px',
            color:'black',
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


      <select 
onChange={handleChangeMonth} 
style={{
  marginLeft: "40px",
  paddingLeft:"10px",
  backgroundColor: "transparent",
  color: "black",
  borderRadius: "6px"
}}
>         
 <option defaultValue >Month</option>
 {monthsToShow.map((month, index) => (
  <option   style={{
    backgroundColor: "transparent",
    color: "black",
    borderRadius: "6px"
  }} key={index} value={index}>{month}</option>
))}
</select>

  </div>






  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{minHeight:"500px"}}>
    <div className="card">
      <div className="card-body">
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope='col'> <button onClick={() => handleSort('name')}> Order No <i className="bi-arrow-down-up"></i></button></th>
         <th scope='col'> <button onClick={() => handleSort('name')}> Reciever <i className="bi-arrow-down-up"></i></button>  </th>
           <th scope='col'> <button onClick={() => handleSort('name')}>Status <i className="bi-arrow-down-up"></i></button>  </th>
            <th scope='col'> <button onClick={() => handleSort('date')}> Date<i className="bi-arrow-down-up"></i></button>  </th>
            {/* <th scope='col'> <button onClick={() => handleSort('price')}> Amount<i className="bi-arrow-down-up"></i></button> </th>   */}
            <th scope='col'>Actions </th>
            </tr>
            </thead>
            <tbody>
            {filteredAllordersadmin.length === 0 && showResults && (
          <tr>
            <td colSpan="9" className="text-center">No results found</td>
          </tr>
        )} {filteredAllordersadmin.map((ordersadmin) => (        
        <tr key={ordersadmin.id}>
                 <td>{ordersadmin.orderNumber} </td>
                 <td>{ordersadmin.deliveryName}</td>
               <td> {ordersadmin.orderStatus === 'Pending' ? (
                              <span className='rounded-pill pending'>{ordersadmin.orderStatus}</span>
                            ) : (
                              <span className='rounded-pill success'>{ordersadmin.orderStatus}</span>
                            )} </td>
              <td>{formatFirebaseTimestamp(ordersadmin.orderDate)}</td> 
            {/* <td> {ordersadmin.price} </td> */}
                  <td>  <Link to={`/admin/${ordersadmin.customerId}/orderdetails/${ordersadmin.id}`}> View Info</Link></td>
          </tr> ))} </tbody>
      </table>
  </div>
  </div>
</div> 


    {/* end of all orders  */}





           




  </div>
</div>






        </div>
    );
}

export default RecentOrders;                     