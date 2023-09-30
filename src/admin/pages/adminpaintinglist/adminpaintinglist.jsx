import React, { useEffect, useState } from 'react';
import './adminpaintinglist.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../../../backend/config/fire'; // Import the Firestore instance from your Firebase configuration
import TotalRevenuesAreaChart from '../../components/productrevnue/productrevenue';
import TrafficImpressionChart from '../../components/trafficimpressions/trafficimpressions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const Adminpaintinglist = () => {
  const [paintings, setPaintings] = useState([]);
  const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const monthsToShow = months.slice(Math.max(currentMonth - 3, 0), currentMonth);  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sortField, setSortField] = useState(null);
  


  

  
  const handleChangeMonth = (event) => {
      setSelectedMonth(event.target.value);
  }


  // Fetch paintings from Firestore on component mount
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const paintingsCollection = collection(db, 'paintings');
        const snapshot = await getDocs(paintingsCollection);
        const paintingData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPaintings(paintingData);
      } catch (error) {
        console.error('Error fetching paintings:', error);
      }
    };

    fetchPaintings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const paintingRef = doc(db, 'paintings', id);
      await deleteDoc(paintingRef);
      console.log('Painting deleted');
      // Refresh the list of paintings after deletion
      const updatedPaintings = paintings.filter((painting) => painting.id !== id);
      setPaintings(updatedPaintings);
    } catch (error) {
      console.error('Error deleting painting:', error);
    }
  };




  useEffect(() => {
      const filtered = paintings.filter(painting => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
          painting.artist.toLowerCase().includes(lowerCaseTerm) ||
          painting.title.toLowerCase().includes(lowerCaseTerm) ||
          painting.price.toString().toLowerCase().includes(lowerCaseTerm) ||
          painting.date.toString().toLowerCase().includes(lowerCaseTerm)   
        );
      });
      setFilteredPaintings(filtered);
      setShowResults(true); // Show results after initializing
  }, [searchTerm, paintings]);
  

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    const filtered = paintings.filter(painting => {
      const lowerCaseTerm = term.toLowerCase();
      return (
        painting.artist.toLowerCase().includes(lowerCaseTerm) ||
        painting.title.toLowerCase().includes(lowerCaseTerm) ||
        painting.price.toString().toLowerCase().includes(lowerCaseTerm) ||  
        painting.date.toString().toLowerCase().includes(lowerCaseTerm)  
      );
    });
  
    setFilteredPaintings(filtered);
    setShowResults(true); // Show results when there is a search term
  };
  
  

  // firlter functions 

  const handleDateRangeChange = (startDate, endDate) => {
  setFilterOptions(prevOptions => ({
    ...prevOptions,
    dateRange: {
      startDate,
      endDate,
    },
  }));
};


const handleFilter = () => {
  const filteredPaintings = paintings.filter(painting => {
    // Apply your filtering logic using filterOptions
  });
  setFilteredPaintings(filteredPaintings);
  setShowResults(true);
};


const handlePriceRangeChange = (minPrice, maxPrice) => {
  setFilterOptions(prevOptions => ({
    ...prevOptions,
    priceRange: {
      minPrice,
      maxPrice,
    },
  }));
};

const handleStatusChange = (statusType) => {
  setFilterOptions(prevOptions => ({
    ...prevOptions,
    status: {
      ...prevOptions.status,
      [statusType]: !prevOptions.status[statusType],
    },
  }));
};


// end of filter config 



    
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
    
      const sortedPaintings = [...filteredPaintings].sort((a, b) => {
        if (field === 'name') {
          return a.title.localeCompare(b.title);
        } else if (field === 'price') {
          return a.price - b.price;
        } else if (field === 'date') {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
    
      if (order === 'desc') {
        sortedPaintings.reverse();
      }
    
      setFilteredPaintings(sortedPaintings);
    };
    
  
   
  
  
  useEffect(() => {
    // Sorting logic based on sortOrder
    const sortedPaintings = [...paintings].sort((a, b) => {
      if (sortOrder.name) {
        return sortOrder.name === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
      if (sortOrder.price) {
        return sortOrder.price === 'asc' ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price);
      }
      
      if (sortOrder.date) {
        return sortOrder.date === 'asc' ? Date.parse(a.date) - Date.parse(b.date) : Date.parse(b.date) - Date.parse(a.date);
      }      
      return 0; // No sorting applied
    });

    setFilteredPaintings(sortedPaintings);
  }, [paintings, sortOrder]);
 
   
  

  return (
    <div> 



          <div className="dashboard-arts-container">
            

            <div className="dashboard-top-art-info d-flex ">

                <div>  <h3>Arts</h3>
                <p>Explore Your Products Easily Manage Your arts, and keep your store Offerings Fresh and attractive </p>
                    </div> 

                    <div className="d-flex ms-auto me-2">

                      <Link className='dashboard-arts-button' to="/admin/addPainting"> Add New Painting <i className="bi bi-brush-fill text-dark"></i></Link>
              
                    </div>
            </div>



          <div className="product-dashboard-charts">
             
          <div className="product-total-revenue-charts">
              <TotalRevenuesAreaChart />
          </div>
          
          <div className='product-traffic-impressions'>
            <TrafficImpressionChart/>
          </div>

          </div>
          







          <ul class="nav nav-pills  mt-4" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link dashboard-customer-display-type-button active" id="pills-list-tab" data-bs-toggle="pill" data-bs-target="#pills-list" type="button" role="tab" aria-controls="pills-list" aria-selected="true"> <i className="bi fs-2 bi-list-ul"></i> </button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link dashboard-customer-display-type-button" id="pills-grid-tab" data-bs-toggle="pill" data-bs-target="#pills-grid" type="button" role="tab" aria-controls="pills-grid" aria-selected="false"> <i className="bi fs-2 bi-grid-fill"></i></button>
  </li>

</ul>






      <div class="tab-content" id="pills-tabContent">


        <div class="tab-pane fade show active" id="pills-list" role="tabpanel" aria-labelledby="pills-list-tab" tabindex="0">...

          <div className="dashboard-arts">

          <div className="dashboard-art-header d-flex mb-5">
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
            <th><label className="ms-2 checkbox-container"> <input type="checkbox" className="custom-checkbox" /><span className="checkmark"></span></label></th>
          <th> <button onClick={() => handleSort('name')}>
            Art Name <i className="bi bi-arrow-down-up"></i></button></th>
          <th> Stock Number </th>
          <th>  <button onClick={() => handleSort('price')}>Price   <i className="bi-arrow-down-up"></i></button></th>
          <th> <button onClick={() => handleSort('date')}> Date <i className="bi-arrow-down-up"></i></button> </th>
          <th> Total Sold <i className="bi-arrow-down-up"></i> </th>
          <th> Status </th>
          <th> Total Revenue <i className="bi-arrow-down-up"></i> </th>
          <th> Action </th>
          </thead>
          <tbody>

      
            {filteredPaintings.length === 0 && showResults && (
            <tr>
              <td colSpan="9" className="text-center">No results found</td>
            </tr>
          ) }
            {filteredPaintings.map((painting) => (
                  <tr key={painting.id}>
            <td><label className=" checkbox-container"> <input type="checkbox" className="custom-checkbox" /><span className="checkmark"></span></label></td>
          <td><img src={painting.img[0]} className='rounded me-2' height="40px" width="40px" alt={painting.title} /><span>{painting.title}</span></td>
           <td> {painting.stockNumber}  </td>
          <td> ${painting.price} </td>
          <td> {painting.date} </td>
          <td style={{display:"none"}}> {painting.artist} </td>
          <td> 11,020 </td>
          <td> <span className='rounded-pill active'>Active </span>  </td>
          <td> $20,900 </td>
          <td> <Link to="#"> delete<i className="bi bi-bin"></i> </Link> </td>
          </tr>))}
          </tbody></table>


          </div>
          </div>
          
        
         






    <div class="tab-pane fade" id="pills-grid" role="tabpanel" aria-labelledby="pills-grid-tab" tabindex="0">

    <div className="dashboard-art-header d-flex mt-5">
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
          <div style={{ position: 'absolute', color:"aliceblue", top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
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

    <div className="painting-grid">
          {filteredPaintings.length === 0 && showResults && (
            <tr>
              <td colSpan="9" className="text-center">No results found</td>
            </tr>
          ) }
            {filteredPaintings.map((painting) => (
              <div className="painting-container" key={painting.id}>
            <div className="admin-painting-preview rounded">
            <Link className='edit-button' to={`/admin/editpaintings/${painting.id}`}>  Edit<i className="bi ms-2 bi-pencil-fill"></i></Link>
                {/* <Link to={`/Adminpaintingpreview/${painting.id}`}> */}
                <img src={painting.img} alt=""/>
                {/* <img src={painting.imageUrl} alt={painting.title} /> */}
              <div className="admin-preview-details">
                <h2>{ painting.title}</h2>
                <h4>${painting.price}</h4>
                <p> { painting.about } </p>
                <span>By { painting.artist }</span>
                <h5>{ painting.date }</h5>
                </div>
                {/* </Link> */}
            </div>
          </div>
        ))}
      </div></div>
      
      
      
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
          <div className="modal-body">
              <h5>Date Range</h5>
              <DatePicker
                selected={filterOptions.dateRange.startDate}
                onChange={date => handleDateRangeChange(date, filterOptions.dateRange.endDate)}
                startDate={filterOptions.dateRange.startDate}
                endDate={filterOptions.dateRange.endDate}
                selectsRange
              />
              <h5>Price Range</h5>
              <input
                type="number"
                value={filterOptions.priceRange.minPrice}
                onChange={e => handlePriceRangeChange(e.target.value, filterOptions.priceRange.maxPrice)}
              />
              <input
                type="number"
                value={filterOptions.priceRange.maxPrice}
                onChange={e => handlePriceRangeChange(filterOptions.priceRange.minPrice, e.target.value)}
              />
              <h5>Status</h5>
              <label>
                <input
                  type="checkbox"
                  checked={filterOptions.status.inStock}
                  onChange={() => handleStatusChange('inStock')}
                />
                In Stock
              </label>
              {/* Add similar inputs for outOfStock and notActive */}
            </div>

          </div>
          <div className="modal-footer">
          <button type="button" className="bg-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="bg-primary" onClick={handleFilter}>Save Changes</button>
          </div>
          </div>
          </div>
          </div>

          {/* modal  */}





    </div>
  );
}

export default Adminpaintinglist;
