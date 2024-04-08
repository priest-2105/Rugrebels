import './adminpaintinglist.css';
import  { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../../backend/config/fire'; 
import TotalRevenuesAreaChart from '../../components/productrevnue/productrevenue';
import TrafficImpressionChart from '../../components/trafficimpressions/trafficimpressions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const Adminpaintinglist = () => {

  

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sortField, setSortField] = useState(null);

  


  // Fetch products from Firestore on component mount
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        const productData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchproducts(); 
  
  }, []);   





  useEffect(() => {
      const filtered = products.filter(product => {
        const lowerCaseTerm = searchTerm ? searchTerm.toLowerCase() : '';

        return (
          (product.artist && product.artist.toLowerCase().includes(lowerCaseTerm)) ||
          (product.title && product.title.toLowerCase().includes(lowerCaseTerm)) ||
          (product.stockNumber && product.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) || 
          (product.price && product.price.toString().toLowerCase().includes(lowerCaseTerm)) ||          
          (product.date && product.date.toString().toLowerCase().includes(lowerCaseTerm))   
        );
      });
      setFilteredproducts(filtered);
      setShowResults(true);  
  }, [searchTerm, products]);
  

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    const filtered = products.filter(product => {
      const lowerCaseTerm = term.toLowerCase();
      return (
        (product.artist && product.artist.toLowerCase().includes(lowerCaseTerm)) ||
        (product.title && product.title.toLowerCase().includes(lowerCaseTerm)) ||
        (product.stockNumber && product.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) || 
        (product.price && product.price.toString().toLowerCase().includes(lowerCaseTerm)) ||          
        (product.date && product.date.toString().toLowerCase().includes(lowerCaseTerm))   
     
       );
    });
  
    setFilteredproducts(filtered);
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
  const filteredproducts = products.filter(product => {
    // Apply your filtering logic using filterOptions
  });
  setFilteredproducts(filteredproducts);
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
    
      const sortedproducts = [...filteredproducts].sort((a, b) => {
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
        sortedproducts.reverse();
      }
    
      setFilteredproducts(sortedproducts);
    };
    
  
   
  
  
  useEffect(() => {
    // Sorting logic based on sortOrder
    const sortedproducts = [...products].sort((a, b) => {
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

    setFilteredproducts(sortedproducts);
  }, [products, sortOrder]);

  
  

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
          <th className='ps-2'> <button onClick={() => handleSort('name')}>
            Art  <i className="bi bi-arrow-down-up"></i></button></th>
          <th> Stock Number </th>
          <th>  <button onClick={() => handleSort('price')}>Price   <i className="bi-arrow-down-up"></i></button></th>
          <th> <button onClick={() => handleSort('date')}> Date <i className="bi-arrow-down-up"></i></button> </th>
          <th> Total Sold <i className="bi-arrow-down-up"></i> </th>
          <th> Status </th>
          <th> Total Revenue <i className="bi-arrow-down-up"></i> </th>
          <th> Action </th>
          </thead>
          <tbody>

      
            {filteredproducts.length === 0 && showResults && (
            <tr>
              <td colSpan="9" className="text-center">No results found</td>
            </tr>
          ) }
         {filteredproducts.map((painting) => (
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
          {filteredproducts.length === 0 && showResults && (
            <tr>
              <td colSpan="9" className="text-center">No results found</td>
            </tr>
          ) }
            {filteredproducts.map((painting) => (
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
