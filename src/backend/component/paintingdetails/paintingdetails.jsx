// ligth gallery and swiperjs 
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



// General 
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/fire';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import useFetch from '../../../assets/hooks/usefetch';
import './paintingdetails.css';
import CurrencyAPI from '@everapi/currencyapi-js';  
import CurrencyConverter from '../../currency/currency';




const Paintingdetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [painting, setPainting] = useState(null);   
  const [isAdded, setIsAdded] = useState(false);
  const [rates, setRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); 
  const baseCurrency = 'USD';
  const [selectedQuantity, setSelectedQuantity] = useState(1);




  const currencyOptions = [
    { value: 'AED', label: 'United Arab Emirates Dirham' },
    { value: 'AFN', label: 'Afghan Afghani' },
  ]




        // Lightgallery inintilization 
        const onInit = () => {
          console.log('lightGallery has been initialized');
      };

      // swiper js 
      const [thumbsSwiper, setThumbsSwiper] = useState(null);


      // Paintings fetch 
      useEffect(() => {
        const paintingRef = doc(db, 'paintings', id);

        // Fetch the document data
        getDoc(paintingRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setPainting(data);
            } else {
              console.log('Document does not exist');
            }
      
          })
          .catch((error) => {
            console.error('Error fetching document:', error.message);
          });
        
      }, [id, db]);
      

          // Function to handle quantity selection changes
        const handleQuantityChange = (e) => {
          setSelectedQuantity(parseInt(e.target.value, 10));
        };
        const calculatedPrice = painting ? painting.price * selectedQuantity : 0;



      // Currency io token initializtion and config 
   useEffect(() => {
    const currencyApi = new CurrencyAPI('cur_live_bW63J02Ob9PGvUZrQZiJNhlpENGdroQF0dfFHxzZ');
    currencyApi.latest({
      base_currency: baseCurrency,
    }).then((response) => {
      console.log('Exchange rate response:', 
      // response.data
      );
      setRates(response.data);
    }).catch((error) => {
      console.error('Error fetching exchange rates:', error);
      // Set default rates here if needed
    });
  }, []);

  // console.log('Current rates:', rates);

const calculateConvertedPrice = (basePriceUSD, targetCurrency) => {
  try {
    if (!rates || Object.keys(rates).length === 0 || !rates[targetCurrency]) {
      return null; // Return early if rates are not available
    }

    const exchangeRate = rates[targetCurrency].value;

    if (exchangeRate !== undefined) {
      return (basePriceUSD * exchangeRate).toFixed(2);
    } else {
      throw new Error('Exchange rate not available');
    }
  } catch (error) {
    console.error('Error calculating converted price:', error.message);
    return null;
  }
};







    // ADD to cart Function  
  const handleAddToCart = async (painting) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const cartRef = collection(db, 'carts', userId, 'items');
  
      const q = query(cartRef, where('paintingId', '==', painting.id));
      const querySnapshot = await getDocs(q);
  
      console.log('Fetched cart items:',
      //  querySnapshot.docs.map(doc => doc.data())
       );
  
      if (querySnapshot.empty) {
        const basePriceUSD = painting.price;
        const exchangeRate = rates[baseCurrency]?.value;
  
        if (exchangeRate !== undefined) {
          const convertedPrice = calculateConvertedPrice(painting.price, selectedCurrency);
  
          try {
            await setDoc(doc(cartRef), {
              paintingId: painting.id,
              paintingTitle: painting.title,
              paintingImage: painting.img,
              paintingdescription: painting.about,
              paintingPrice: calculatedPrice,
              targetCurrency: selectedCurrency,
              paintingDate: painting.date,
              paintingArtist: painting.artist
            });
  
            console.log('Item added to cart:',
            //  painting.id
             );
            setIsAdded(true);
  
            setTimeout(() => {
              setIsAdded(false);
            }, 3000); // Reset after 3 seconds
          } catch (error) {
            console.error('Error adding item to cart:', error.message);
          }
        } else {
          console.error('Exchange rate not available');
        }
      } else {
        console.log('Item is already in the cart');
      }
    } else {
      console.log('User is not authenticated');
    }
  };

  const prevbutton = () => {
    history.push("/shop");
  };

        
       
  return (
    <div className='painting-details'>
      <button className='prevbutton' onClick={prevbutton}><i className="bi bi-arrow-left-square-fill"></i></button> 
      {/* { error && <div>{ error }</div>} */}
    { painting && (  <div className="backlinks">
            <Link to='/'>Home</Link>
            /<Link to='/shop'>Shop</Link>  
           /<Link className='disabled' to='/'>{painting.title}</Link>

          </div>)}
      {/* { preloader && <div className='preloader'>...Loading </div> } */}

      { painting && (
        <div className='painting-detail-container'>
      
          <div className='painting-detail'>
          
        <div className="image-swiper-container">
       {thumbsSwiper && ( <Swiper
            style={{
              '--swiper-navigation-color': 'rgb(250, 254, 36,0.5)',
              '--swiper-pagination-color': 'rgb(250, 254, 36,0.5)',
            }}
            loop={true}
            spaceBetween={0}
            navigation={true}
            scrollbar={{ draggable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            onSwiper={setThumbsSwiper}
            slidesPerView={1}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Scrollbar]}
           className="mySwiper2"
           >
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
          </Swiper>  )}
         
        
        <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            modules={[Navigation,Pagination, Scrollbar, A11y]} 
            navigation
            className="mySwiper"
            style={{
              '--swiper-navigation-color': 'rgb(250, 254, 36,0.2)',
              '--swiper-pagination-color': 'rgb(250, 254, 36,0.2)',
            }}
          >
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={painting.img} />
            </SwiperSlide>
          </Swiper>
         
          </div>  
            {/* <img src={painting.img} alt="painting" /> */}
            <div className="product-description ms-4">
              <h2>{painting.title}</h2> 
          
          {/* <div className="painting-description-currency"> */}
             {/* <span>Convert</span> */}
              {/* <select className='select-input col-6 ms-2' value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value} - {option.label}
                  </option>
                ))}
              </select> */}
              {/* </div> */}

              <div className="product-description-price">
                {/* {calculateConvertedPrice(painting.price, selectedCurrency)} {selectedCurrency} */}
                  <h4>${calculatedPrice}</h4>
                <h3>$60000</h3>
              </div>

            <div className="buttons">
              <div className="quantity">
                <span>Quantity</span>
                <select
            className="select-input ms-2 pe-4 ps-4 pt-2 pb-2"
            name="quantityselect"
            id="quantityselect"
            onChange={handleQuantityChange}
            value={selectedQuantity}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
              </div>
                <button className='btn' onClick={() => handleAddToCart(painting)}>Add to Cart</button>
                <button className='btn'>Buy Now</button>
              </div>

            
                  
           </div>
          </div>

          {isAdded && (
             <div className="popup">
              Item added to cart!
              <button onClick={() => setIsAdded(false)}>Close</button>
            </div>
          )}
        </div>
      )}
    
      

         <div className="bottom-product-details">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item bg-transparent" role="presentation">
        <button className="nav-link active bg-transparent" id="productdescription-tab" data-bs-toggle="tab" data-bs-target="#productdescription-tab-pane" type="button" role="tab" aria-controls="productdescription-tab-pane" aria-selected="true">
          <h3>Description</h3></button>
      </li>
      <li className="nav-item bg-transparent" role="presentation">
        <button className="nav-link bg-transparent" id="Reviews-tab" data-bs-toggle="tab" data-bs-target="#Reviews-tab-pane" type="button" role="tab" aria-controls="Reviews-tab-pane" aria-selected="false">
         <h3> Reviews</h3>
          </button>
      </li>
      </ul>
   
        { painting &&(
    <div className="tab-content bottom-product-details-tab-content" id="myTabContent">
      <div className="tab-pane fade show active" id="productdescription-tab-pane" role="tabpanel" aria-labelledby="productdescription-tab" tabIndex="0">
        {painting.about}
        </div>


        {/* Reviews Tab */}
      <div className="tab-pane fade" id="Reviews-tab-pane" role="tabpanel" aria-labelledby="Reviews-tab" tabIndex="0">

      <div className="row">
        <div className="col-12 col-lg-12 d-lg-flex  align-items-start">
          <div className="client_review mx-2 ">
            
            <h2 className="pt-4 mb-3">Client Reviews</h2>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <span className="ms-1">4.32</span>
            <p>1200 reviews</p>    
            <div className="mt-3">
            <button className="btn review-report">
              Create review
            </button>
          </div>
          </div>
            <div className="ms-lg-4 mt-lg-5 mt-md-4 mt-sm-4 mt-xs-4 product-review-star-container">
            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">5</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar five ms-2"></div>
              <span className="ms-2">32940</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">4</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar four ms-2"></div>
              <span className="ms-2">3294</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">3</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar three ms-2"></div>
              <span className="ms-2">329</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">2</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar two ms-2"></div>
              <span className="ms-2">32</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">1&nbsp;</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar one ms-2"></div>
              <span className="ms-2">3</span>
            </div>
          </div>
          </div>
      
        <div className="col-12">
          <hr />
          <div>
            <div className="py-2">
              <div className="d-flex flex-row align-items-center">
                
                <div className="user-info">
                  <span className="review_name">Ifeanyi Okeakwalam</span><br/>
                  <span className="qualification mt-1">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                    <i className="bi bi-star"></i>
                    <span className="ps-2">2 weeks ago</span>
                  </span>
                </div>

                <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div>
              </div>

              <div className="pt-3 review_text">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facere vel reprehenderit cumque architecto cupiditate
                  distinctio earum repudiandae adipisci.
                </p>
              </div>
              <div className=" ">
                <button className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill"></i>
                </button>
                <button className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill"></i>
                </button>
                <button className="btn review-report ms-3 mt-xs-3">
                  Report this review
                </button>
              </div>
            </div>
            <hr />
          </div>

          <div>
            <div className="py-2">
              <div className="d-flex flex-row align-items-center">
                
                <div className="user-info">
                  <span className="review_name">Ifeanyi Okeakwalam</span><br/>
                  <span className="qualification mt-1">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                    <i className="bi bi-star"></i>
                    <span className="ps-2">2 weeks ago</span>
                  </span>
                </div>                <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div>
              </div>

              <div className="pt-3 review_text">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facere vel reprehenderit cumque architecto cupiditate
                  distinctio earum repudiandae adipisci.
                </p>
              </div>
              <div className="review_helpful">
                <button className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill"></i>
                </button>
                <button className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill"></i>
                </button>
                <button className="btn review-report ms-3 mt-xs-3">
                  Report this review
                </button>
              </div>
            </div>
            <hr />
          </div>
         </div>
      </div>

      </div>
    </div>    
    )} 
       </div>  



       
        { painting &&(  
        <div className="mobile-cart-button">
             <h2>{painting.title}</h2>  
             <h4>${calculatedPrice}</h4>
             <div className="mobile-qauntity-button d-flex">
              <button onClick={() => selectedQuantity + 1}>-</button>
              <span>{selectedQuantity}</span>
              <button onClick={() =>  selectedQuantity + 1}>+</button>
                 <button className='btn' onClick={() => handleAddToCart(painting)}>Add to Cart</button>
            </div> 
             </div>)}

       

    </div>
  );
}

export default Paintingdetails;