import React from 'react';
import {  useEffect, useRef, useState } from 'react';
import { db, auth } from '../../config/fire';  
// import InputRange from 'react-input-range';
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import 'react-input-range/lib/css/index.css'
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/animsition/4.0.2/js/animsition.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';




const Pets = () => {
            

    const navigate = useNavigate();
    const ref = useRef(null);
    const [products, setProducts] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const monthsToShow = months.slice(Math.max(currentMonth - 3, 0), currentMonth);  
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [productQuantities, setProductQuantities] = useState({});
    const [inCart, setinCart] = useState(true);
    const [displayedProductsCount, setDisplayedProductsCount] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [weightRange, setWeightRange] = useState({min: 5,max: 80000,});
    const [priceRange, setPriceRange] = useState({ min: 1000,max: 400000,});
     
  
  
  
  
    const handleCategoryChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedCategory(selectedValue);
      
      const filteredProducts = selectedValue === ''
    ? products
    : products.filter(product => {
        console.log('Product Category:', product.category);
        return product.category === selectedValue;
      });
  
      setFilteredProducts(filteredProducts);
    };useEffect(() => {
      console.log('Selected Category State:', selectedCategory);
    }, [selectedCategory]);
    
    // Example event handler for weight range change
    const handleWeightRangeChange = (value) => {
      setWeightRange(value);
    
      // Filter products based on the selected weight range
      const filteredProducts = products.filter(product => 
        product.weight >= value.min && product.weight <= value.max
      );
      setFilteredProducts(filteredProducts);
    };
    
    const handlePriceRangeChange = (value) => {
      setPriceRange(value);
    
      // Convert the price range values to numbers
      const minValue = parseFloat(value.min);
      const maxValue = parseFloat(value.max);
    
      // Filter products based on the selected price range
      const filteredProducts = products.filter((product) =>
        (
          parseFloat(product.pricePerUnit || product.pricePerWeight) >= minValue &&
          parseFloat(product.pricePerUnit || product.pricePerWeight) <= maxValue
        ) ||
        (
          parseFloat(product.price || product.pricePerWeight) >= minValue &&
          parseFloat(product.price || product.pricePerWeight) <= maxValue
        )
      );
    
      setFilteredProducts(filteredProducts);
    };
    
    const handleSortChange = (event) => {
      setSortOrder(event.target.value);
  
      // Sort products based on the selected order
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = parseFloat(a.pricePerUnit || a.pricePerWeight);
        const priceB = parseFloat(b.pricePerUnit || b.pricePerWeight);
  
        if (sortOrder === 'asc') {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
  
      setFilteredProducts(sortedProducts);
    };
  
        // useEffect(() => {
        //   const filteredProducts = products.filter(product =>
        //     (!selectedCategory || product.category === selectedCategory) &&
        //     product.weight >= weightRange.min && product.weight <= weightRange.max &&
        //     product.price >= priceRange.min && product.price <= priceRange.max
        //   );
        //   setFilteredProducts(filteredProducts);
        // }, [selectedCategory, weightRange, priceRange, products, setFilteredProducts]);
        
      
        useEffect(() => {
          const fetchProducts = async () => {
            try {
              const productsCollection = collection(db, 'products');
              const snapshot = await getDocs(productsCollection);
              const productData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
              setProducts(productData);
              setFilteredProducts(productData);
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };
      
          fetchProducts();
        }, []);
      
      
        useEffect(() => {
          const filtered = products.filter((product) => {
            const lowerCaseTerm = searchTerm ? searchTerm.toLowerCase() : '';
      
            return (
              (product.artist && product.artist.toLowerCase().includes(lowerCaseTerm)) ||
              (product.title && product.title.toLowerCase().includes(lowerCaseTerm)) ||
              (product.stockNumber && product.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) ||
              (product.price && product.price.toString().toLowerCase().includes(lowerCaseTerm)) ||
              (product.category && product.category.toLowerCase().includes(lowerCaseTerm)) ||
              (product.date && product.date.toString().toLowerCase().includes(lowerCaseTerm)) ||
              (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseTerm)))
            );
          });
      
          setFilteredProducts(filtered);
        }, [searchTerm, products]);
      
        const handleInputChange = (e) => {
          const term = e.target.value;
          setSearchTerm(term);
        
          if (term.trim() === '') {
            // If the search term is empty, show all products
            setFilteredProducts(displayedProducts);
            return;
          }
        
          const filtered = products.filter((product) => {
            const lowerCaseTerm = term.toLowerCase();
            return (
              (product.title && product.title.toLowerCase().includes(lowerCaseTerm)) ||
              (product.category && product.category.toLowerCase().includes(lowerCaseTerm)) ||
              (product.stockNumber && product.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) ||
              (product.price && product.price.toString().toLowerCase().includes(lowerCaseTerm)) ||
              (product.date && product.date.toString().toLowerCase().includes(lowerCaseTerm)) ||
              (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseTerm)))
            );
          });
        
          setFilteredProducts(filtered);
          setShowResults(true);
        };
      
        const handleBrowseMoreProducts = () => {
          // Update the count to display two more products
          setDisplayedProductsCount((prevCount) => prevCount + 4);
        };
      
        const displayedProducts = filteredProducts.slice(0, displayedProductsCount);
      
    
        
        

            
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
            
            const sortedproducts = [...filteredProducts].sort((a, b) => {
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
            
            setFilteredProducts(sortedproducts);
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
            return 0; 
            });

            setFilteredProducts(sortedproducts);
        }, [products, sortOrder]);
        
        
        

        const handleAddToCart = async (product) => {
            try {
            if (!auth.currentUser) {
                console.log('User is not authenticated');
                navigate('/auth/login');
                toast('Please Login Before Proceeding');  
                return;
            }
            const productQuantity = selectedQuantities[product.id] || 0;
            const userId = auth.currentUser.uid;
            const customersRef = collection(db, 'customers');
            const customerDocRef = doc(customersRef, userId);
            toast('Adding Item');  
        
            if (!(await getDoc(customerDocRef)).exists()) {
                await setDoc(customerDocRef, { cart: [] });
            }
        
            const cartItemsRef = collection(customerDocRef, 'cart');
            const productDocRef = doc(cartItemsRef, product.id); // Use product ID as doc ID
            const cartItem = {
                productTitle: product.title,
                productImage: product.img,
                productdescription: product.description,
                productPrice: product.pricePerWeight || product.pricePerUnit,
                productWeightType: product.weightType,
                productDate: product.dateAdded,
                inCart,
                productPriceType: product.priceType,
                weightType: product.weightType,
                unitquantity: !product.weightType && (productQuantity || 1),
                weightquantity: product.weightType && ( productQuantities[product.id] || 0.5),     
                totalAmount: selectedQuantity * (product.pricePerWeight || product.pricePerUnit)
            };
            await setDoc(productDocRef, cartItem); // Use setDoc to set with custom doc ID
        
            setIsAdded(true);
        
            // Display success toast
            toast.success('Item added to cart successfully.');
            } catch (error) {
            console.error('Error adding item to cart:', error);
        
            // Display error toast
            toast.error('Error adding item to cart. Please try again later.');
            }
        };
        
        
        
        
        const handleIncreaseQuantity = (productId) => {
            setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1,
            }));
        }
        
        const handleDecreaseQuantity = (productId) => {
            setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
            }));
        }


        const handleQuantityChange = (productId, quantity) => {
            setProductQuantities(prevQuantities => ({
                ...prevQuantities,
                [productId]: quantity
            }));
        };



            const clearFilters = () => {
            // Reset all filter-related state variables to their default values
            setSelectedCategory('');
            setWeightRange({ min: 5, max: 80000 });
            setPriceRange({ min: 1000, max: 400000 });
            setSortOrder({
                name: null,
                price: null,
                date: null,
            });
            setFilteredProducts(products); // Reset filtered products to all products
            };

                    // Custom NextArrow component
                    const PrevArrow = (props) => {
                    const { className, style, onClick } = props;
                    return (
                        <div className={className} style={{ ...style, display: 'block',position:"absolute", top:"40%",right:"60px", zIndex:"999" }} onClick={onClick}>
                        <i className="text-primary fs-1 bi bi-arrow-left-circle-fill"></i>
                        </div>
                    );
                    };
        
                // Custom NextArrow component
                const NextArrow = (props) => {
                const { className, style, onClick } = props;
                return (
                    <div className={className} style={{ ...style, display: 'block',position:"absolute", top:"40%",right:"-30px" }} onClick={onClick}>
                    <i className="text-primary fs-1 bi bi-arrow-right-circle-fill"></i>
                    </div>
                );
                };
                const settings = {
                    dots: false,
                    infinite: true,
                    speed: 1400,
                    slidesToShow: 3.5,
                    slidesToScroll: 3,
                    animation: true,
                    autoplaySpeed: 10000,
                    autoplay: true,
                    pauseOnDotsHover: true,
                    pauseOnFocus: true,
                    prevArrow: <PrevArrow />,
                    nextArrow: <NextArrow />,
                    responsive: [
                    {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                    },   {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                    },
                        {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                        },
                    ],
                    };
        


        return (
<div className="container-xxl py-5" style={{paddingTop:"150px"}}>
      
      <div className="container" style={{marginTop:"150px"}}>


            
            
                
                    <div className="section-header product-list-header text-start mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{marginTop:"100px",maxWidth:"500px"}}>
                                <h1 className="d-lg-display-5 text-primary mb-3">Our pets Products</h1>
                                <p>TheseInlcude all our discounted petsd products. Take the offers now while it lasts.</p>
                            </div>
        

            
            
                            <div className="row g-0 gx-5 align-items-start">
                            <div className="col-lg-12">                
                            <div className="dashboard-art-header  d-xs-block d-sm-block d-lg-flex d-xl-flex d-md-flex d-flex mb-5">
              
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
                                border: '2px solid black',
                                backgroundColor: 'transparent',
                                width: '250px',
                                color:'white',
                                boxSizing: 'border-box',
                                outline: 'none'
                            }}
                        />
                        <div className="text-primary" style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" >
                                <path fillRule="evenodd"d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.027.045.055.088.086.13l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.087-.13zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                        </div>

                </div>
                
                        </div> 
                        <div className="row g-4 col-lg-12 col-md-12 col-sm-12 col-xs-12 col bg-dark" style={{minHeight:"500px"}}>
                            {displayedProducts.filter((product) => product.category === "pets").length === 0 && showResults && (
                                <tr>
                                <td colSpan="9" className="text-center">No results found</td>
                                </tr>
                            ) }
                            {displayedProducts
                            .filter((product) => product.category === "pets")
                            .map((product) => {
                            const productId = product.id;
                            const productQuantity = selectedQuantities[productId] || 1;
                        
                                return (
                                    <div className="col-xl-4 col-lg-4 d-flex bg-dark  text-light  position-relative col-md-12 wow fadeInUp" data-wow-delay="0.1s" key={product.id}>                       
                                    <div className="product-item bg-black ms-auto  me-auto each-product-container text-light" style={{height:"100%"}}>
                                        <div className="position-relative bg-black overflow-hidden">
                                        <img className="img-fluid w-100" src={product.img && (product.img[0] || product.img) || 'https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'} alt="" style={{ height: "300px", objectFit: "contain" }}  />
                                        {product.isNew && <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3"> New</div>}
          
                                            {/* <button className="bg-primary border-0 rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3"><i className="bi bi-bag-heart-fill"></i></button> */}
                                        </div>  
                                        <div className="text-start text-light mt-5 p-4">
                                            <h6 style={{fontSize:"15px"}} className="d-block text-light product-item-title">{product.title}</h6>
                                        {/* line throguh for weight price  */}
                                     <div  className="d-flex">
          
                                        <div  className="d-flex">
                                    {product.pricePerWeight >= 1 &&
                                        <div>
                                            {product.compareAtPrice >= 1 && <span style={{fontSize:"14px"}}  className="text-light text-body text-decoration-line-through">${product.compareAtPrice * (productQuantities[productId] || 1)}</span>}
                                        </div>  }   
                                        
                                        {/* line throguh for unit price  */}
                                        {product.pricePerUnit >= 1 ?
                                        <div>
                                            {product.compareAtPrice >= 1 && <span style={{fontSize:"14px"}}  className="text-light text-body text-decoration-line-through">${product.compareAtPrice * productQuantity }</span>}
                                        </div>    :  <span className='d-none'>Unit quantity not available</span> }                          
          
                                        {product.compareAtPrice >= 1 && <span className="text-body text-light   ps-1 pe-1">-</span>}
                                    
                                            <span className="text-primary  text-light me-1">{product.pricePerUnit && '$' || product.pricePerWeight && '$' }
                                            {product.pricePerUnit * productQuantity  ||  product.pricePerWeight * (productQuantities[productId] || 1) }</span>
                                        </div>  
                                      
                                          
                                        {/* <button onClick={() => handleAddToCart(product)} className="text-body ms-auto me-1 text-primary text-light border-0 bg-transparent">
                                             <i class="bi bi-bag text-primary "></i>
                                            </button> */}
                                            <Link  to={`${product.stripelink}`} className="text-body ms-auto me-1 text-primary text-light border-0 bg-transparent">
                                        <i className="bi text-primary bi-bag"> </i>
                                      </Link>
                                        </div>
                                     </div>
          
                                        {/* <div className="d-flex align-items-center justify-content-center">
                                            
                                        {product.pricePerUnit ? (
                                        <div className="d-flex align-items-center justify-content-center">
                                        <button onClick={() => handleDecreaseQuantity(productId)} className="btn btn-link"><i className="fas fa-minus"></i></button>
                                    <input
                                            id={`form1-${productId}`}
                                            min="0.5"
                                            name="quantity"
                                            value={productQuantity}
                                            type="number"
                                            className="form-control form-control-sm text-center"
                                            readOnly
                                        />  <button onClick={() => handleIncreaseQuantity(productId)} className="btn btn-link"><i className="fas fa-plus"></i></button>
                                        </div>  
                                        ) : (
                                        <div className="d-flex align-items-center justify-content-center">
                                        
                                        <input
                                        id={`form1-${productId}`}
                                        min="0.5"
                                        name="quantity"
                                        value={productQuantities[productId] || 0.5 } 
                                        type="number"
                                        className="form-control form-control-sm text-center"
                                        onChange={(e) => handleQuantityChange(productId, e.target.value)} // Update the selected quantity in the state
                                    /><span>  {product.weightType}</span>
                                    </div>
                                        )}
                                            
                                        </div> */}
                                        
                                    
                                        {/* <div className="d-flex border-top mt-2">
                                        <small className="w-50 text-center border-end py-2">
                                            <Link className="text-body  text-light" to={`/publicpath/productdetails/${product.id}`}>
                                            <i className="fa fa-eye text-primary me-2"></i>View detail
                                            </Link>
                                        </small> 
                                        <small className="w-50 text-center border-end py-2">
                                    
                                        <button onClick={() => handleAddToCart(product)} className="text-body  text-light border-0 bg-transparent">
                                             <i class="bi bi-bag"></i>
                                            </button>
                                        </small>
                                    
                                        </div>                            */}
                                        </div> 
                                        <Link className="text-body quick-view-button rounded-pill fw-bold btn-primary py-1 px-3 text-light" to={`/publicpath/productdetails/${product.id}`}>
                                           Quick View
                                            </Link>
                                </div>   );
                                } 
                                )}
                            </div>
                            <div className="col-12 mt-4 text-center wow fadeInUp" data-wow-delay="0.1s">
                            {displayedProducts.filter((product) => product.category === "pets").length >= 1 &&
                    <button className="btn btn-primary rounded-pill py-3 px-5" onClick={handleBrowseMoreProducts}>
                      Browse More Products
                    </button>}
                  </div>
                </div></div>
                









                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body product-search-filter">
                <div className='p-2'>
                                        
                {/* <label htmlFor="categories">Categories</label><br />
                <select
                id="categories"
                name="categories"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-control col-11 mb-2 mt-2"
                >
                <option value="">All Categories</option>
                <option value="livestock">Livestock</option>
                <option value="frozen">Frozen</option>
                <option value="raw Product">Raw Product</option>
                </select><br/> */}


                <label htmlFor="sortOrder" className="col-12 me-2">
                        Sort Price:
                    </label>
                    <select
                        id="sortOrder"
                        name="sortOrder"
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="form-control mb-2 col-11"
                    >
                        <option default value="">Sort Price</option>
                        <option value="asc">Lowest to Highest</option>
                        <option value="desc">Highest to Lowest</option>
                    </select>

            

            
            {/* <div className="col-11">
            <label className="mt-5 mb-4" htmlFor="weightRange">Weight Range</label>
                <InputRange
                maxValue={8000}
                minValue={500}
                value={weightRange}
                formatLabel={value => `${value} kg`}
                onChange={handleWeightRangeChange}
                onChangeComplete={handleWeightRangeChange}
                /></div>


                            <div> */}
                        </div>
                <div className="footer">  <button className='mt-4 me-4 btn-primary btn' onClick={clearFilters}>Clear Filters</button></div>
                            </div>   
                
                    </div>
 

 


            </div>
        );
        };

export default Pets;
