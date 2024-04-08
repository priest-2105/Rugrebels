import './similarproduct.css'
// import 'https://cdnjs.cloudflare.com/ajax/libs/animsition/4.0.2/js/animsition.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import React from "react";
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import {  useEffect, useRef, useState } from 'react';
import { db, auth } from '../../config/fire';  
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





    const SimilarProduct = ({ similarCategory }) => {

    
        
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
  const [selectedCategory, setselectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [productQuantities, setProductQuantities] = useState({});
  const [inCart, setinCart] = useState(true);



  // const [selectedCategory, setSelectedCategory] = useState("");
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
        const fetchSimilarProducts = async () => {
          try {
            const productsCollection = collection(db, 'products');
            const snapshot = await getDocs(productsCollection);
            const productData = snapshot.docs.map((doc) => {
              const product = { id: doc.id, ...doc.data() };
    
              const today = new Date();
              const productDate = new Date(product.dateAdded);
    
              const timeDifference = Math.abs(today - productDate);
              const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
              product.isNew = daysDifference <= 7;
    
              return product;
            });
    
            // Filter products based on the similar category
            const filteredProducts = similarCategory
              ? productData.filter(product => product.category === similarCategory)
              : productData;
    
            setProducts(filteredProducts);
            console.log('Similar Category', similarCategory);
          } catch (error) {
            console.error('Error fetching similar products:', error);
          }
        };
    
        fetchSimilarProducts();
      }, [similarCategory]);

  
  useEffect(() => {
      const filtered = products.filter(product => {
        const lowerCaseTerm = searchTerm ? searchTerm.toLowerCase() : '';

        return (
          (product.artist && product.artist.toLowerCase().includes(lowerCaseTerm)) ||
          (product.title && product.title.toLowerCase().includes(lowerCaseTerm)) ||
          (product.stockNumber && product.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) || 
          (product.price && product.price.toString().toLowerCase().includes(lowerCaseTerm)) ||
          (product.category && product.category.toLowerCase().includes(lowerCaseTerm)) ||
          (product.date && product.date.toString().toLowerCase().includes(lowerCaseTerm))   ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerCaseTerm))) 
          );
      });
      setFilteredProducts(filtered);
      setShowResults(true);  
  }, [searchTerm, products]);
  

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    const filtered = products.filter(product => {
      const lowerCaseTerm = term.toLowerCase();
      return (
        (product.title && product.title.toLowerCase().includes(lowerCaseTerm)) ||
        (product.category && product.category.toLowerCase().includes(lowerCaseTerm)) ||
        (product.stockNumber && product.stockNumber.toString().toLowerCase().includes(lowerCaseTerm)) || 
        (product.price && product.price.toString().toLowerCase().includes(lowerCaseTerm)) ||          
        (product.date && product.date.toString().toLowerCase().includes(lowerCaseTerm))   ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerCaseTerm))) 
       );
    });
  
    setFilteredProducts(filtered);
    setShowResults(true);  
  };
  
  

    
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
        productStockNumber: product.stockNumber,
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





        // Custom PrevArrow component
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
        <div>


        {filteredProducts.length >= 5 &&  
          <div className="container-xxl py-1 position-relative" style={{marginTop:"40px"}}>
              <div className="container">
                  <div className="section-header text-start mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth:"500px"}}>
                              <h1 className="d-lg-display-5 mb-3">Similar Products</h1>
                          </div>
                          <div className=" g-0 gx-5 align-items-start">
                      <div className="g-4 bg-light" style={{minHeight:"600px"}}>
                      {/* <div className="wrap-slick1 rs2-slick1 ">
                    <div className="slick1"> */}
                          <Slider {...settings}>
                                  {filteredProducts.length === 0 && showResults && (
                                  <tr>
                                  <td colSpan="9" className="text-center">No results found</td>
                                  </tr>
                              ) }
                              {filteredProducts.map(product => {
                              const productId = product.id;
                              const productQuantity = selectedQuantities[productId] || 1;

                                  return (
                              
                                  <div className="col-xl-12 col-lg-12 py-4 bg-light  position-relative col-md-12 wow fadeInUp" data-wow-delay="0.1s" key={product.id}>
                                      <div className="product-item bg-white" style={{height:"100%"}}>
                                          <div className="position-relative bg-white overflow-hidden">
                                          <img className="img-fluid w-100" src={product.img && (product.img[0] || product.img) || 'https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'} alt="" style={{ height: "300px", objectFit: "contain" }}  />
                                          {product.isNew && <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3"> New</div>}

                                              {/* <button className="bg-primary border-0 rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3"><i className="bi bi-bag-heart-fill"></i></button> */}
                                          </div>  
                                          <div className="text-center p-4">
                                              <h5 className="d-block h5 product-item-title mb-2">{product.title}</h5>
                                          {/* line throguh for weight price  */}
                                          
                                          {product.pricePerWeight >= 1 &&
                                          <div>
                                              {product.compareAtPrice >= 1 && <span className="text-body text-decoration-line-through">${product.compareAtPrice * (productQuantities[productId] || 1)}</span>}
                                          </div>  }   
                                          
                                          {/* line throguh for unit price  */}
                                          {product.pricePerUnit >= 1 ?
                                          <div>
                                              {product.compareAtPrice >= 1 && <span className="text-body text-decoration-line-through">${product.compareAtPrice * productQuantity }</span>}
                                          </div>    :  <span className='d-none'>Unit quantity not available</span> }                          

                                          {product.compareAtPrice >= 1 && <span className="text-body  ps-1 pe-1">-</span>}
                                      
                                              <span className="text-primary me-1">{product.pricePerUnit && '$' || product.pricePerWeight && '$' }
                                              {product.pricePerUnit * productQuantity  ||  product.pricePerWeight * (productQuantities[productId] || 1) }</span>
                                          </div> 
                                          <div className="d-flex align-items-center justify-content-center">
                                              
                                          {product.pricePerUnit ? (
                                          <div className="d-flex align-items-center justify-content-center">
                                          <button onClick={() => handleDecreaseQuantity(productId)} className="btn btn-link"><i className="fas fa-minus"></i></button>
                                      <input
                                              id={`form1-${productId}`}
                                              min="0"
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
                                              
                                          </div>
                                          
                                      
                                          <div className="d-flex border-top mt-2">
                                          <small className="w-50 text-center border-end py-2">
                                              <Link className="text-body" to={`/publicpath/productdetails/${product.id}`}>
                                              <i className="fa fa-eye text-primary me-2"></i>View detail
                                              </Link>
                                          </small> 
                                          <small className="w-50 text-center border-end py-2">
                                      
                                          <button onClick={() => handleAddToCart(product)} className="text-body border-0 bg-transparent">
                                                  <i className="fa fa-shopping-bag text-primary me-2"></i>Add to cart 
                                              </button>
                                          </small>
                                      
                                          </div>                           
                                          </div> 
                                  </div>
                                          );
                                  } 
                                  )}
                          </Slider>	
                          </div>
                  
                            </div>
        
              </div>
        


          </div>}






        </div>
    );
}

export default SimilarProduct;
