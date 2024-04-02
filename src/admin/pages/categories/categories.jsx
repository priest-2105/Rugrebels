import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../backend/config/fire'; 
import { Link } from 'react-router-dom';





const PaintingsByCategory = () => {
  const { category } = useParams();
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
  



  useEffect(() => {
    const fetchPaintingsByCategory = async () => {
      try {
        const paintingsRef = collection(db, 'paintings');
        const q = query(paintingsRef, where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const paintingData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPaintings(paintingData);
      } catch (error) {
        console.error('Error fetching paintings:', error);
      }
    };

    fetchPaintingsByCategory();
  }, [category]);


  

  useEffect(() => {
      const filtered = paintings.filter(painting => {
        const lowerCaseTerm = searchTerm ? searchTerm.toLowerCase() : '';

        return (
          (painting.artist && painting.artist.toLowerCase().includes(lowerCaseTerm)) ||
          (painting.title && painting.title.toLowerCase().includes(lowerCaseTerm)) ||
          (painting.stockNumber && painting.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) || 
          (painting.price && painting.price.toString().toLowerCase().includes(lowerCaseTerm)) ||          
          (painting.date && painting.date.toString().toLowerCase().includes(lowerCaseTerm))   
        );
      });
      setFilteredPaintings(filtered);
      setShowResults(true);  
  }, [searchTerm, paintings]);
  

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    const filtered = paintings.filter(painting => {
      const lowerCaseTerm = term.toLowerCase();
      return (
        (painting.artist && painting.artist.toLowerCase().includes(lowerCaseTerm)) ||
        (painting.title && painting.title.toLowerCase().includes(lowerCaseTerm)) ||
        (painting.stockNumber && painting.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) || 
        (painting.price && painting.price.toString().toLowerCase().includes(lowerCaseTerm)) ||          
        (painting.date && painting.date.toString().toLowerCase().includes(lowerCaseTerm))   
     
       );
    });
  
    setFilteredPaintings(filtered);
    setShowResults(true);  
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
      <h2>All Paintings in {category} Category</h2>


      <ul className="nav nav-pills  mt-4" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link dashboard-customer-display-type-button active" id="pills-list-tab" data-bs-toggle="pill" data-bs-target="#pills-list" type="button" role="tab" aria-controls="pills-list" aria-selected="true"> <i className="bi fs-2 bi-list-ul"></i> </button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link dashboard-customer-display-type-button" id="pills-grid-tab" data-bs-toggle="pill" data-bs-target="#pills-grid" type="button" role="tab" aria-controls="pills-grid" aria-selected="false"> <i className="bi fs-2 bi-grid-fill"></i></button>
  </li>

</ul>






      <div className="tab-content" id="pills-tabContent">


        <div className="tab-pane fade show active" id="pills-list" role="tabpanel" aria-labelledby="pills-list-tab" tabIndex="0">

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


     
          </div>

          <table>

          <thead>
          <th className='ps-2'> <button onClick={() => handleSort('name')}>
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
    <td>
      {painting.img && painting.img[0] && (
        <>
          <img src={painting.img[0]} className='rounded me-2' height="40px" width="40px" alt="" />
          <span>{painting.title}</span>
        </>
      )}
    </td>
    <td>{painting.stockNumber}</td>
    <td>${painting.price}</td>
    <td>{painting.date}</td>
    <td style={{ display: "none" }}>{painting.artist}</td>
    <td>11,020</td>
    <td>
      <span className='rounded-pill active'>Active</span>
    </td>
    <td>$20,900</td>
    <td>
    <td><Link to={`/admin/adminpaintingpreview/${painting.id}`}>  View</Link> </td>
    </td>
  </tr>
))}

          </tbody></table>


          </div>
          </div>
          
        
         






    <div className="tab-pane fade" id="pills-grid" role="tabpanel" aria-labelledby="pills-grid-tab" tabIndex="0">

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


       

          </div>

    <div className="painting-grid">
          {filteredPaintings.length === 0 && showResults && (
            <tr>
              <td colSpan="9" className="text-center">No results found</td>
            </tr>
          ) }
            {filteredPaintings.map((painting) => (
              <div className="painting-container" key={painting.id} style={{backgroundImage: `url(${painting.img[0]})`}}>
            <div className="admin-painting-preview rounded" >
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
  );
};

export default PaintingsByCategory;
