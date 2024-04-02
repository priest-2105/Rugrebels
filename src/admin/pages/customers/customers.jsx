import './customers.css'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'; 
import { db } from '../../../backend/config/fire';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';



const Customers = () => {
 
 
 
  const [ admincustomerlist, setAdmincustomerlist ] = useState([]);
  const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const monthsToShow = months.slice(Math.max(currentMonth - 3, 0), currentMonth);  
   const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmincustomerlist, setFilteredAdmincustomerlist] = useState([]);
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
          const fetchadmincustomerlist = async () => {
            const admincustomerlistCollection = collection(db, 'admincustomerlist');
            const snapshot = await getDocs(admincustomerlistCollection);
            const admincustomerlistData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAdmincustomerlist(admincustomerlistData);
          };
      
          fetchadmincustomerlist();
        }, []);

        
  

      //   for displaying timestamp 
  function formatFirebaseTimestamp(timestamp) {
      const dateObject = timestamp.toDate();
      return dateObject.toLocaleDateString(); // Adjust format as needed
  }
      
  const updateOrderStatus = async (orderId, newStatus) => {
      try {
        const orderRef = doc(db, 'admincustomerlist', orderId);
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
        setAdmincustomerlist(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? {...order, status: 'Delivered'} : order
          )
        );
      } catch (error) {
        console.error('Error approving order:', error);
      }
    };
    



useEffect(() => {
  const filtered = admincustomerlist.filter(customerlist => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
     ( customerlist.name && customerlist.name.toLowerCase().includes(lowerCaseTerm)) ||
     ( customerlist.email && customerlist.email.toLowerCase().includes(lowerCaseTerm)) ||
     ( customerlist.location && customerlist.location.toLowerCase().includes(lowerCaseTerm)) || 
     ( customerlist.amountspent && customerlist.amountspent.toLowerCase().includes(lowerCaseTerm)) || 
     ( customerlist.phonenumber && customerlist.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
     ( customerlist.date && customerlist.date.toString().toLowerCase().includes(lowerCaseTerm)) 

      // Add more checks as needed
    );
  });
  setFilteredAdmincustomerlist(filtered);
  setShowResults(true); // Show results after initializing
}, [searchTerm, admincustomerlist]);


const handleInputChange = (e) => {
const term = e.target.value;
setSearchTerm(term);

const filtered = admincustomerlist.filter(customerlist => {
  const lowerCaseTerm = term.toLowerCase();
  return (
   ( customerlist.name && customerlist.name.toLowerCase().includes(lowerCaseTerm)) ||
   ( customerlist.email && customerlist.email.toLowerCase().includes(lowerCaseTerm)) ||
   ( customerlist.location && customerlist.location.toLowerCase().includes(lowerCaseTerm)) || 
   ( customerlist.amountspent && customerlist.amountspent.toLowerCase().includes(lowerCaseTerm)) || 
   ( customerlist.phonenumber && customerlist.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
   ( customerlist.date && customerlist.date.toString().toLowerCase().includes(lowerCaseTerm)) 
  );
});

setFilteredAdmincustomerlist(filtered);
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
  
    const sortedAdmincustomerlist = [...filteredAdmincustomerlist].sort((a, b) => {
      if (field === 'name') {
        return a.name.localeCompare(b.name);
      } else if (field === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
  
    if (order === 'desc') {
      sortedAdmincustomerlist.reverse();
    }
  
    setFilteredAdmincustomerlist(sortedAdmincustomerlist);
  };
  

 


useEffect(() => {
  // Sorting logic based on sortOrder
  const sortedAdmincustomerlist = [...admincustomerlist].sort((a, b) => {
    if (sortOrder.name) {
      return sortOrder.name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortOrder.date) {
      return sortOrder.date === 'asc' ? Date.parse(a.date) - Date.parse(b.date) : Date.parse(b.date) - Date.parse(a.date);
    }      
    return 0; // No sorting applied
  });

  setFilteredAdmincustomerlist(sortedAdmincustomerlist);
}, [admincustomerlist, sortOrder]);

 


    // end of table sorting config 



 
 
 
    return (
        <div>
            
            <div className="dashboard-customers-container">
  

                <div className="dashboard-top-customer-info d-flex ">

                     <div>  <h3>Customers</h3>
                     <p>Explore and Easily Manage Your Customers, and keep your store open and attractive </p>
                        </div> 

                        <div className="d-flex ms-auto me-2">

                            <div className="dashboard-top-customer-info-points">
                                <span><i className="bi bi-people-fill"></i></span>
                                <div>
                                    <h6>137,000</h6>
                                    <p>Total Customers</p>
                                </div>
                            </div>



                            <div className="dashboard-top-customer-info-points">
                                <span><i className="bi bi-person-fill-add"></i></span>
                                <div>
                                    <h6>137,000  <i className="ms-1 bi bi-graph-up-arrow"></i> </h6>
                                    <p className="mb-3">New Customers</p>
                                  
                                </div>
                            </div>




                            <div className="dashboard-top-customer-info-points">
                                <span><i className="bi bi-door-open-fill"></i></span>
                                <div>
                                    <h6>1,000 Million
                                    </h6>
                                    <p className="mb-3">Total Visitors </p>
                                </div>
                            </div>

                            

                        </div>
                </div>
  
  
  
  
         <div className="dashboard-customers">

          <div className="dashboard-customer-header d-flex mb-5">
        <Link to="#" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            <h3>Filter <i className="bi bi-funnel"></i></h3></Link>

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


              <select 
        onChange={handleChangeMonth} 
        style={{
          marginLeft: "40px",
          paddingLeft:"10px",
          backgroundColor: "transparent",
          color: "aliceblue",
          borderRadius: "6px"
        }}
        >         
         <option defaultValue >Month</option>
         {monthsToShow.map((month, index) => (
          <option   style={{
            backgroundColor: "transparent",
            color: "aliceblue",
            borderRadius: "6px"
          }} key={index} value={index}>{month}</option>
        ))}
        </select>

          </div>


           <table>

          <thead>
          <th><button onClick={() => handleSort('name')}>Customer Name <i className="bi bi-sort-alpha-up"></i> </button> </th>
          <th><button onClick={() => handleSort('name')}> Email </button>  </th>
          <th><button onClick={() => handleSort('name')}> Phone Number </button>  </th>
          <th><button onClick={() => handleSort('name')}> Location</button>  </th>
          <th><button onClick={() => handleSort('name')}> Date <i className="bi-arrow-down-up"></i></button>  </th>
          <th><button onClick={() => handleSort('name')}>Total Spent <i className="bi-arrow-down-up"></i> </button>  </th>
          <th>Actions </th>
          </thead>
        <tbody>

        {filteredAdmincustomerlist.length === 0 && showResults && (
            <tr>
              <td colSpan="9" className="text-center">No results found</td>
            </tr>
          )} {filteredAdmincustomerlist.map((customerlist) => (        
          <tr key={customerlist.id}>
              <td><img src={customerlist.img} className='rounded me-2' height="30px" width="30px" alt="" />{customerlist.name}</td>
              <td>{customerlist.email}</td>
              <td> {customerlist.phonenumber} </td>
              <td> {customerlist.location}</td>
              <td> {formatFirebaseTimestamp(customerlist.date)} </td>
              <td> {customerlist.amountspent}</td>
              <td><Link to={`/admin/admincustomerdetails/${customerlist.id}`}>  View Profile</Link> </td>
            </tr>))} </tbody>

             </table>

          </div>
        </div>



        {/* Modal */}


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Filter</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Filter
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

          {/* modal  */}

        </div>
    );
}

export default Customers;
