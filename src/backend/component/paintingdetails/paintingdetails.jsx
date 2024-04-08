// ligth gallery and swiperjs 
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// General 
import { doc, getDoc, addDoc , setDoc, collection, onSnapshot , query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/fire';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import useFetch from '../../../assets/hooks/usefetch';
import './paintingdetails.css';
import SimilarProduct from '../similarproduct/similarproduct';




const Paintingdetails = () => {



  const history = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);   
  const [isAdded, setIsAdded] = useState(false);
  const [Adding, setAdding] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1); 


    // Review init    
  const reviewId = useParams().reviewId;
  const [reviews, setReviews] = useState([]);
  const [numReviews, setNumReviews] = useState(0);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [date, setDate] = useState('');
  const [oneStarReviews, setOneStarReviews] = useState([]);
  const [twoStarReviews, setTwoStarReviews] = useState([]);
  const [threeStarReviews, setThreeStarReviews] = useState([]);
  const [fourStarReviews, setFourStarReviews] = useState([]);
  const [fiveStarReviews, setFiveStarReviews] = useState([]);
  const countsDocRef = doc(db, 'products', id, 'review', id);
  const [counts, setCounts] = useState({ likes: 0, dislikes: 0 });
  const [unitquantity, setUnitquantity] = useState(1);
  const [weightquantity, setWeightquantity] = useState(1);
  const [inCart, setinCart] = useState(true);
  const [similarCategory, setSimilarCategory] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");



    const onInit = () => {
      console.log('lightGallery has been initialized');
    };

    // swiper js 
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

      



    useEffect(() => {
      const productRef = doc(db, 'products', id);
    
      // Fetch the document data
      getDoc(productRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setProduct(data);
    
            // Get and display the category field value
            const categoryValue = data.category;
            console.log('Category:', categoryValue);
    
            // Set similarCategory state to the category of the current product
            setSimilarCategory(categoryValue);
          } else {
            console.log('Document does not exist');
          }
        })
        .catch((error) => {
          console.error('Error fetching document:', error.message);
        });
    }, [id, db]);


      // fetching reviews 
      useEffect(() => {
        const reviewRef = collection(db, 'products', id, 'review');
      
        // Fetch the documents in the subcollection
        getDocs(reviewRef)
          .then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => doc.data());
            setReviews(data);
          })
          .catch((error) => {
            console.error('Error fetching documents:', error.message);
          });
      }, [id, db]);
      

      // Review Date 

      useEffect(() => {
        // Get the current date in the format YYYY-MM-DD
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
      }, []);


      const handleAddToCart = async (product, id) => {
        console.log('Product Price Type:', product.priceType);
          if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const cartRef = collection(db, 'customers', userId, 'cart');
            
          try {
            setAdding(true);
            await setDoc(doc(cartRef, id), { 
              productTitle: product.title,
              productImage: product.img,
              productdescription: product.description,
              productPrice: product.pricePerWeight || product.pricePerUnit,
              productWeightType: product.weightType,
              weightquantity: product.priceType === 'weight' ? weightquantity : 0,
              unitquantity: product.priceType === 'unit' ? unitquantity : 0,
              productStockNumber: product.stockNumber,
              inCart,
              productPriceType : product.priceType,
              productDate: product.dateAdded, 
              totalAmount: selectedQuantity * (product.pricePerWeight || product.pricePerUnit)
            });
      
            console.log('Item added to cart with product ID:', id);
            setIsAdded(true);
            setAdding(false);    
            setTimeout(() => {
              setIsAdded(false);
            }, 3000); // Reset after 3 seconds
      
            // Display success toast
            toast.success('Item added to cart successfully.');
          } catch (error) {
            console.error('Error adding item to cart:', error.message);
      
            // Display error toast
            toast.error('Error adding item to cart. Please try again later.');
          }
        } else {
          console.log('User is not authenticated');
        }
      };



 
      
      


      // Add Review 
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const reviewRef = collection(db, 'products', id, 'review');
      
          await addDoc(reviewRef, {
            name,
            rating: parseInt(rating, 10),
            comments,
            likes,
            dislikes,
            date,
          });
      
          console.log('Review added successfully');
          // Clear form inputs after successful submission
          setName('');
          setRating('');
          setComments('');
          setLikes('');
          setDislikes('');
          setDate('');
      
          // Display success toast
          toast.success('Review added successfully.');
        } catch (error) {
          console.error('Error adding review: ', error);
      
          // Display error toast
          toast.error('Error adding review. Please try again later.');
        }
      };
      
    
      // Number of reviews 
      useEffect(() => {
        const getNumReviews = async () => {
          const reviewRef = collection(db, 'products', id, 'review');
          const querySnapshot = await getDocs(reviewRef);
          setNumReviews(querySnapshot.size);
        };
    
        const getFiveStarReviews = async () => {
          const reviewRef = collection(db, 'products', id, 'review');
          const q = query(reviewRef, where('rating', '==', 5));
          const querySnapshot = await getDocs(q);
    
          const reviews = querySnapshot.docs.map(doc => doc.data());
          setFiveStarReviews(reviews);
        };

        const getFourStarReviews = async () => {
          const reviewRef = collection(db, 'products', id, 'review');
          const q = query(reviewRef, where('rating', '==', 4));
          const querySnapshot = await getDocs(q);
    
          const reviews = querySnapshot.docs.map(doc => doc.data());
          setFourStarReviews(reviews);
        };

        const getThreeStarReviews = async () => {
          const reviewRef = collection(db, 'products', id, 'review');
          const q = query(reviewRef, where('rating', '==', 3));
          const querySnapshot = await getDocs(q);
    
          const reviews = querySnapshot.docs.map(doc => doc.data());
          setThreeStarReviews(reviews);
        };


        const getTwoStarReviews = async () => {
          const reviewRef = collection(db, 'products', id, 'review');
          const q = query(reviewRef, where('rating', '==', 2));
          const querySnapshot = await getDocs(q);
    
          const reviews = querySnapshot.docs.map(doc => doc.data());
          setTwoStarReviews(reviews);
        };


        const getOneStarReviews = async () => {
          const reviewRef = collection(db, 'products', id, 'review');
          const q = query(reviewRef, where('rating', '==', 1));
          const querySnapshot = await getDocs(q);
    
          const reviews = querySnapshot.docs.map(doc => doc.data());
          setOneStarReviews(reviews);
        };
    
        getOneStarReviews();
        getTwoStarReviews();
        getThreeStarReviews();
        getFourStarReviews();
        getFiveStarReviews();
        getNumReviews();
      }, [id, db]);

  
      // Fetch the current counts from Firestore
      const getCounts = async () => {
        const docSnap = await getDoc(countsDocRef);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          return { likes: 0, dislikes: 0 }; // Default values if the document doesn't exist
        }
      };
      
      
        useEffect(() => {
          getCounts().then(data => setCounts(data));
        }, []);
      

        const handleLike = async (reviewId) => {
          const reviewDocRef = doc(db, 'products', id, 'review', reviewId);
        
          const reviewDocSnap = await getDoc(reviewDocRef);
        
          if (reviewDocSnap.exists()) {
            const reviewData = reviewDocSnap.data();
            const updatedLikes = (reviewData.likes || 0) + 1;
            await setDoc(reviewDocRef, { ...reviewData, likes: updatedLikes }, { merge: true });
        // Optionally, update the UI state to reflect the change
          } else {
            // If the review document doesn't exist, create it with the initial like count of 1
            await setDoc(reviewDocRef, { likes: 1 }, { merge: true });
            // Optionally, update the UI state to reflect the change
          }
        };
        
        const handleDislike = async (reviewId) => {
          const reviewDocRef = doc(db, 'products', id, 'review', reviewId);
        
          const reviewDocSnap = await getDoc(reviewDocRef);
        
          if (reviewDocSnap.exists()) {
            const reviewData = reviewDocSnap.data();
            const updatedDislikes = (reviewData.dislikes || 0) + 1;
            await setDoc(reviewDocRef, { ...reviewData, dislikes: updatedDislikes }, { merge: true });
          } else {
            // The review does not exist
          }
        };
        
        
                
                // UseEffect hook to update the UI after the useParams hook has been executed
        // useEffect(() => {
        //   // Get the reviewId from the URL parameters
        //   const reviewId = useParams().reviewId;

          
        //   handleLike(reviewId)
        //   handleDislike(reviewId);
        // }, []);


        useEffect(() => {
        const reviewDocRef = doc(db, 'products', id, 'review', id);

        const unsubscribe = onSnapshot(reviewDocRef, (doc) => {
          if (doc.exists()) {
            const reviewData = doc.data();
          }
        });

        return () => unsubscribe(); // Unsubscribe when component unmounts
        }, [id]);

        



      const prevbutton = () => {
        history.push("/shop");
      };

   

       
  return (
    <div className='product-details bg-dark' style={{paddingTop:"200px"}}>
      {/* { error && <div>{ error }</div>} */}
    { product && (  <div className="backlinks">
            <Link to='/'>Home</Link>
            /<Link to='/shop'>Shop</Link>  
           /<Link className='disabled' to='/'>{product.title}</Link>

          </div>)}
      {/* { preloader && <div className='preloader'>...Loading </div> } */}

      { product && (
        <div className='product-detail-container bg-black'>
      
          <div className='product-detail'>
          
        <div className="image-swiper-container">
       {thumbsSwiper && ( <Swiper
            style={{
              '--swiper-navigation-color': 'rgb(185, 203, 22)',
              '--swiper-pagination-color': 'rgb(185, 203, 22)',
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
             {product.img.map((image, index) => 
             <SwiperSlide key={image.id} >
              <img className1="product-detail-image-each" src={image} />
            </SwiperSlide>)} 
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
              '--swiper-navigation-color': 'rgba(185, 203, 22,0.2)',
              '--swiper-pagination-color': 'rgba(185, 203, 22,0.2)',
            }}
          >
            {product.img.map((image, index) => 
             <SwiperSlide key={image.id}>
              <img src={image} />
            </SwiperSlide>)} 
          </Swiper>
         
          </div>  
            <div className="product-description ms-4">
              <h1 className="text-primary">{product.title}</h1> 
              <div className="product-description-price">
               {product.compareAtPrice * selectedQuantity > 0 && (<h4 style={{textDecoration:"line-through", opacity:"0.3"}}>${product.compareAtPrice * unitquantity}</h4>)}
               <h4 className="ms-4"> ${(product.pricePerUnit || product.pricePerWeight) * (product.pricePerUnit ? unitquantity : weightquantity)}</h4>
                 </div>     
                    <h4> {product.weightType && ' Per '} {product.weightType}</h4> 
                

              <div className="buttons">
  <div className="quantity mb-3 d-flex align-items-center">
    <h6>Quantity</h6>
    {product.pricePerUnit ? (
      <div className="d-flex align-items-center justify-content-center">
        <button className='btn me-3 fs-3 product-decreament' onClick={() => setUnitquantity(unitquantity - 1)}>-</button>
        <h6 className="mt-2 fs-5">{unitquantity}</h6>
        <button className='btn ms-3 fs-3 product-increament' onClick={() => setUnitquantity(unitquantity + 1)}>+</button>
      </div>  
    ) : (
      <div className="d-flex align-items-center justify-content-center">
        <input
          id=""
          min="1"
          name="quantity"
          value={weightquantity} 
          type="number"
          className="ms-1 me-1 fw-bold form-control form-control-sm text-center"
          onChange={(e) => setWeightquantity(e.target.value)}  
        />
        <span> {product.weightType}</span>
      </div>
    )}
  </div>
 
    {product && <a href={`${product.stripelink}`} className='btn btn-secondary btn-lg'> Buy Now </a>} 

      {/* {!product.custom && <div>{Adding ?  <button disabled className='btn btn-secondary btn-lg'>Adding</button> : <button className='btn  rounded-pill btn-secondary' onClick={() => handleAddToCart(product, id)}>Add to Cart</button>}</div>} 
      {product.custom && <button type='button' className='btn btn-secondary btn-lg rounded-pill'  data-bs-toggle="modal" data-bs-target="#customproductmodal">Add to Cart</button>} */}

</div>
           </div>
          </div>

        </div>
      )}
    
      

         
    { product &&(
    <div className="bottom-product-details">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li   className="nav-item bg-transparent" role="presentation">
        <button className="nav-link active text-primary bg-transparent" id="productdescription-tab" data-bs-toggle="tab" data-bs-target="#productdescription-tab-pane" type="button" role="tab" aria-controls="productdescription-tab-pane" aria-selected="true">
          <h3 className="text-primary">Description</h3></button>
      </li>
      <li className="nav-item text-primary bg-transparent" role="presentation">
        <button className="nav-link text-primary bg-transparent" id="Reviews-tab" data-bs-toggle="tab" data-bs-target="#Reviews-tab-pane" type="button" role="tab" aria-controls="Reviews-tab-pane" aria-selected="false">
         <h3 className="text-primary"> Reviews</h3>
          </button>
      </li>
      </ul>
   
      
    <div className="tab-content bottom-product-details-tab-content" id="myTabContent">
   
       { product &&( <div className="tab-pane fade product-description-tab show active" id="productdescription-tab-pane" role="tabpanel" aria-labelledby="productdescription-tab" tabIndex="0">
       <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>)} 


        {/* Reviews Tab */}
      <div className="tab-pane fade" id="Reviews-tab-pane" role="tabpanel" aria-labelledby="Reviews-tab" tabIndex="0">

      <div className="row">
        <div className="col-12 col-lg-12 d-lg-flex  align-items-start">
          <div className="client_review mx-2 ">                        
          <h1 className="text-primary pt-4 mb-3">Client Reviews</h1>           
            <p>{numReviews} Reviews</p>    
            <div className="mt-3"> 
            <button type="button"  data-bs-toggle="modal" data-bs-target="#addreview" className="btn btn-primary review-report">
              Add review
            </button>
          </div>
          </div>
            <div className="ms-lg-4 mt-lg-5 mt-md-5 mt-sm-5 mt-xs-5 product-review-star-container">
           <div className="d-flex align-items-center">
           <h4>Average Rating:</h4>  
           <h6><span className="ms-1"> {((1 * oneStarReviews.length + 2 * twoStarReviews.length + 3 * threeStarReviews.length + 4 * fourStarReviews.length + 5 * fiveStarReviews.length) / (oneStarReviews.length + twoStarReviews.length + threeStarReviews.length + fourStarReviews.length + fiveStarReviews.length)).toFixed(2)}</span>
         <i className=" ms-2 bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i></h6></div> 
            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">5</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar five ms-2"></div>
              <span className="ms-2">{fiveStarReviews.length}</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">4</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar four ms-2"></div>
              <span className="ms-2">{fourStarReviews.length}</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">3</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar three ms-2"></div>
              <span className="ms-2">{threeStarReviews.length}</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">2</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar two ms-2"></div>
              <span className="ms-2">{twoStarReviews.length}</span>
            </div>

            <div className="client_review_star mt-1 d-flex flex-row">
              <span className="star_text">1&nbsp;</span>
              <i className="bi bi-star-fill ms-1"></i>
              <div className="progress_bar one ms-2"></div>
              <span className="ms-2">{oneStarReviews.length}</span>
            </div>
          </div>
          </div>
      

          <ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
               

               <a className="nav-link bg-transparent active" id="general-rating-tab" data-bs-toggle="tab" data-bs-target="#general-rating-tab-pane" type="a" role="tab" aria-controls="general-rating-tab-pane" aria-selected="false">
               <div className="client_review_star mt-1 d-flex flex-row">              
          <span className="star_text">All Ratings</span>
            <i className="bi bi-star-fill ms-1"></i>
              </div></a>
{/* 
          <a className="nav-link bg-transparent" id="five-star-rating-tab" data-bs-toggle="tab" data-bs-target="#five-star-rating-tab-pane" type="a" role="tab" aria-controls="five-star-rating-tab-pane" aria-selected="false">
          <div className="client_review_star mt-1 d-flex flex-row">              
          <span className="star_text">5</span>
            <i className="bi bi-star-fill ms-1"></i>
         </div></a>
  
  
      <a className="nav-link bg-transparent" id="four-star-rating-tab" data-bs-toggle="tab" data-bs-target="#four-star-rating-tab-pane" type="button" role="tab" aria-controls="four-star-rating-tab-pane" aria-selected="false">
          <div className="client_review_star mt-1 d-flex flex-row">
            <span className="star_text">4</span>
            <i className="bi bi-star-fill ms-1"></i>
          </div></a>

      <a className="nav-link bg-transparent" id="three-star-rating-tab" data-bs-toggle="tab" data-bs-target="#three-star-rating-tab-pane" type="button" role="tab" aria-controls="four-star-rating-tab-pane" aria-selected="false">
          <div className="client_review_star mt-1 d-flex flex-row">
            <span className="star_text">3</span>
            <i className="bi bi-star-fill ms-1"></i>
          </div>
          </a>

          <a className="nav-link bg-transparent" id="two-star-rating-tab" data-bs-toggle="tab" data-bs-target="#two-star-rating-tab-pane" type="button" role="tab" aria-controls="two-star-rating-tab-pane" aria-selected="false">
          <div className="client_review_star mt-1 d-flex flex-row">
            <span className="star_text">2</span>
            <i className="bi bi-star-fill ms-1"></i>
          </div>
          </a>

          <a className="nav-link bg-transparent" id="one-star-rating-tab" data-bs-toggle="tab" data-bs-target="#one-star-rating-tab-pane" type="button" role="tab" aria-controls="two-star-rating-tab-pane" aria-selected="false">
          <div className="client_review_star mt-1 d-flex flex-row">
            <span className="star_text">1&nbsp;</span>
            <i className="bi bi-star-fill ms-1"></i>
          </div>
          </a> */}

          </ul>

        <div className="tab-content bottom-product-details-tab-content" id="rating-stars-comment-tab">
      
      
      {/* General Rating  */}
       <div className="tab-pane fade active show" id="general-rating-tab-pane" role="tabpanel" aria-labelledby="general-rating-tab" tabIndex="0"> 
          {reviews.map((review, index) => (
              <div key={index}>
                <div className="py-2">
                  <div className="d-flex flex-row align-items-center">
                  <div className="user-info">
                  <span className="review_name">{review.name}</span><br/>
                  <span className="qualification mt-1">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${index < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                  ))} 
                    <span className="ps-2">{review.date}</span>
                  </span>
            
                </div>
               <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div> </div>

              <div className="pt-3 pb-3 review_text">
                <p>
                 {review.comments}
                   </p>
              </div>
              <div className=" ">
                <button onClick={() => handleLike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill me-2"></i>({counts.likes})
                </button>
                  <button  onClick={() => handleDislike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill me-2"></i>({counts.dislikes}) 
                </button>
              </div>
          </div>
         
            </div>))}
            </div>

      {/* One star rating  */}
      <div className="tab-pane fade" id="one-star-rating-tab-pane" role="tabpanel" aria-labelledby="one-star-rating-tab" tabIndex="0">

           {oneStarReviews.map((review, index) => (
              <div key={index}>
                <div className="py-2">
                  <div className="d-flex flex-row align-items-center">
                  <div className="user-info">
                  <span className="review_name">{review.name}</span><br/>
                  <span className="qualification mt-1">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${index < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                  ))} 
                    <span className="ps-2">{review.date}</span>
                  </span>
            
                </div>
               <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div> </div>

              <div className="pt-3 pb-3 review_text">
                <p>
                 {review.comments}
                   </p>
              </div>
                <div className=" ">
                <button onClick={() => handleLike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill me-2"></i>({counts.likes})
                </button>
                  <button  onClick={() => handleDislike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill me-2"></i>({counts.dislikes}) 
                </button>
              </div>
          </div>
         
            </div>))}     
     
          </div>


        {/* Two star rating  */}
       <div className="tab-pane fade" id="two-star-rating-tab-pane" role="tabpanel" aria-labelledby="two-star-rating-tab" tabIndex="0">
          
       {twoStarReviews.map((review, index) => (
              <div key={index}>
                <div className="py-2">
                  <div className="d-flex flex-row align-items-center">
                  <div className="user-info">
                  <span className="review_name">{review.name}</span><br/>
                  <span className="qualification mt-1">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${index < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                  ))} 
                    <span className="ps-2">{review.date}</span>
                  </span>
            
                </div>
               <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div> </div>

              <div className="pt-3 pb-3 review_text text-light">
                <p>
                 {review.comments}
                   </p>
              </div>
                <div className=" ">
                <button onClick={() => handleLike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill me-2"></i>({counts.likes})
                </button>
                  <button  onClick={() => handleDislike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill me-2"></i>({counts.dislikes}) 
                </button>
              </div>
          </div>
         
            </div>))}  

          </div>

              {/* three star rating  */}
          <div className="tab-pane fade" id="three-star-rating-tab-pane" role="tabpanel" aria-labelledby="three-star-rating-tab" tabIndex="0">
            
          {threeStarReviews.map((review, index) => (
              <div key={index}>
                <div className="py-2">
                  <div className="d-flex flex-row align-items-center">
                  <div className="user-info">
                  <span className="review_name">{review.name}</span><br/>
                  <span className="qualification mt-1">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${index < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                  ))} 
                    <span className="ps-2">{review.date}</span>
                  </span>
            
                </div>
               <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div> </div>

              <div className="pt-3 pb-3 review_text">
                <p>
                 {review.comments}
                   </p>
              </div>
                <div className=" ">
                <button onClick={() => handleLike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill me-2"></i>({counts.likes})
                </button>
                  <button  onClick={() => handleDislike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill me-2"></i>({counts.dislikes}) 
                </button>
              </div>
          </div>
         
            </div>))}  

          </div>


            {/* four star rating  */}
          <div className="tab-pane fade" id="four-star-rating-tab-pane" role="tabpanel" aria-labelledby="four-star-rating-tab" tabIndex="0">
              
          {fourStarReviews.map((review, index) => (
              <div key={index}>
                <div className="py-2">
                  <div className="d-flex flex-row align-items-center">
                  <div className="user-info">
                  <span className="review_name">{review.name}</span><br/>
                  <span className="qualification mt-1">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${index < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                  ))} 
                    <span className="ps-2">{review.date}</span>
                  </span>
            
                </div>
               <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div> </div>

              <div className="pt-3 pb-3 review_text">
                <p>
                 {review.comments}
                   </p>
              </div>
                <div className=" ">
                <button onClick={() => handleLike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill me-2"></i>({counts.likes})
                </button>
                  <button  onClick={() => handleDislike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill me-2"></i>({counts.dislikes}) 
                </button>
              </div>
          </div>
         
            </div>))}  

          </div>

              {/* five star tab  */}
          <div className="tab-pane fade" id="five-star-rating-tab-pane" role="tabpanel" aria-labelledby="five-star-rating-tab" tabIndex="0">
                  
          {fiveStarReviews.map((review, index) => (
              <div key={index}>
                <div className="py-2">
                  <div className="d-flex flex-row align-items-center">
                  <div className="user-info">
                  <span className="review_name text-primary">{review.name}</span><br/>
                  <span className="qualification mt-1">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${index < review.rating ? 'bi-star-fill text-primary bg-primary' : 'bi-star'}`}
                    ></i>
                  ))} 
                    <span className="ps-2">{review.date}</span>
                  </span>
            
                </div>
               <div className="ms-auto">
                  <i className="bi bi-share"></i>
                </div> </div>

              <div className="pt-3 pb-3 review_text">
                <p>
                 {review.comments}
                   </p>
              </div>
              <div className=" ">
                <button onClick={() => handleLike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-up-fill me-2"></i>({counts.likes})
                </button>
                  <button  onClick={() => handleDislike(review.reviewId)} className="btn ms-3">
                  <i className="bi bi-hand-thumbs-down-fill me-2"></i>({counts.dislikes}) 
                </button>
              </div>
          </div>
         
            </div>))}  

          </div>


  
            

            </div>
          </div>
          </div>
      </div></div>)}


       
        {/* { product &&(  
        <div className="mobile-cart-button p-3">
             <h2>{product.title}</h2>  
             <h4> ${product.pricePerWeight * selectedQuantity || product.pricePerUnit * selectedQuantity}</h4>
             <div className="mobile-qauntity-button align-items-center d-flex">
              <button className='btn-mobile ms-2' onClick={() => setSelectedQuantity(selectedQuantity + 1)}>-</button>
              <span className='ms-3'>{selectedQuantity}</span>
              <button className='btn-mobile ms-3' onClick={() =>  setSelectedQuantity(selectedQuantity + 1)}>+</button>
              <button className='btn btn-secondary' onClick={() => handleAddToCart(product, id)}>Add to Cart</button>

            </div> 
             </div>)} */}






        {/* Add  review modal */}
        <div className="text-light modal fade review-modal-bg" id="addreview" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addreviewLabel" aria-hidden="true">
        <div className="text-light modal-dialog review-modal-bg modal-dialog-centered">
          <div className="bg-dark border-primary text-light modal-content review-modal">
            <div className="bg-dark border-primary text-light modal-header">
              <h1 className="bg-dark border-primary text-primary modal-title text-primary rounded-pill fs-5" id="addreviewLabel">Add Review</h1>
              <button type="button" className="text-light" data-bs-dismiss="modal" aria-label="Close"> <i className="bi  fs-4 text-light bi-x-lg"></i> </button>
            </div>
             <form>
              <div className="bg-dark border-primary text-light modal-body">
           

            <div className="rating-container">
          <div className="feedback">
            <div className="rating">
              <input
              type="radio" 
              name="rating" 
              id="rating-5"
              value="5"
              onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="rating-5"></label>
           
              <input 
              type="radio" 
              name="rating" 
              id="rating-4"
              value="4"
              onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-4"></label>
             
              <input
              type="radio" 
              name="rating" 
              id="rating-3"
              value="3"
              onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-3"></label>
            
              <input
              type="radio" 
              name="rating" 
              id="rating-2"
              value="2"
              onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-2"></label>
              
              <input 
              type="radio" 
              name="rating" 
              id="rating-1"
              value="1"
              onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-1"></label>
              <div className="emoji-wrapper">
                <div className="emoji">
                  <svg className="rating-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                  <path d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z" fill="#f4c534"/>
                  <ellipse transform="scale(-1) rotate(31.21 715.433 -595.455)" cx="166.318" cy="199.829" rx="56.146" ry="56.13" fill="#fff"/>
                  <ellipse transform="rotate(-148.804 180.87 175.82)" cx="180.871" cy="175.822" rx="28.048" ry="28.08" fill="#3e4347"/>
                  <ellipse transform="rotate(-113.778 194.434 165.995)" cx="194.433" cy="165.993" rx="8.016" ry="5.296" fill="#5a5f63"/>
                  <ellipse transform="scale(-1) rotate(31.21 715.397 -1237.664)" cx="345.695" cy="199.819" rx="56.146" ry="56.13" fill="#fff"/>
                  <ellipse transform="rotate(-148.804 360.25 175.837)" cx="360.252" cy="175.84" rx="28.048" ry="28.08" fill="#3e4347"/>
                  <ellipse transform="scale(-1) rotate(66.227 254.508 -573.138)" cx="373.794" cy="165.987" rx="8.016" ry="5.296" fill="#5a5f63"/>
                  <path d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z" fill="#3e4347"/>
                </svg>
                  <svg className="rating-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                  <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
                  <path d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z" fill="#3e4347"/>
                  <path d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z" fill="#f4c534"/>
                  <path d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z" fill="#fff"/>
                  <path d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z" fill="#3e4347"/>
                  <path d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z" fill="#fff"/>
                  <path d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z" fill="#f4c534"/>
                  <path d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z" fill="#fff"/>
                  <path d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z" fill="#3e4347"/>
                  <path d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z" fill="#fff"/>
                </svg>
                  <svg className="rating-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                  <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
                  <path d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z" fill="#3e4347"/>
                  <path d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z" fill="#fff"/>
                  <circle cx="340" cy="260.4" r="36.2" fill="#3e4347"/>
                  <g fill="#fff">
                    <ellipse transform="rotate(-135 326.4 246.6)" cx="326.4" cy="246.6" rx="6.5" ry="10"/>
                    <path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z"/>
                  </g>
                  <circle cx="168.5" cy="260.4" r="36.2" fill="#3e4347"/>
                  <ellipse transform="rotate(-135 182.1 246.7)" cx="182.1" cy="246.7" rx="10" ry="6.5" fill="#fff"/>
                </svg>
                  <svg className="rating-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
            <path d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z" fill="#3e4347"/>
            <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
            <g fill="#fff">
              <path d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z"/>
              <ellipse cx="356.4" cy="205.3" rx="81.1" ry="81"/>
            </g>
            <ellipse cx="356.4" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"/>
            <g fill="#fff">
              <ellipse transform="scale(-1) rotate(45 454 -906)" cx="375.3" cy="188.1" rx="12" ry="8.1"/>
              <ellipse cx="155.6" cy="205.3" rx="81.1" ry="81"/>
            </g>
            <ellipse cx="155.6" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"/>
            <ellipse transform="scale(-1) rotate(45 454 -421.3)" cx="174.5" cy="188" rx="12" ry="8.1" fill="#fff"/>
          </svg>
                  <svg className="rating-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                  <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
                  <path d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"/>
                  <path d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z" fill="#d03f3f"/>
                  <path d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"/>
                  <path d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"/>
                  <path d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z" fill="#d03f3f"/>
                  <path d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"/>
                  <path d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z" fill="#3e4347"/>
                  <path d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z" fill="#e24b4b"/>
                </svg>
                  <svg className="rating-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <g fill="#ffd93b">
                    <circle cx="256" cy="256" r="256"/>
                    <path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z"/>
                  </g>
                  <path d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z" fill="#e9eff4"/>
                  <path d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#45cbea"/>
                  <path d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#e84d88"/>
                  <g fill="#38c0dc">
                    <path d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z"/>
                  </g>
                  <g fill="#d23f77">
                    <path d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z"/>
                  </g>
                  <path d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z" fill="#3e4347"/>
                  <path d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z" fill="#e24b4b"/>
                  <path d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z" fill="#fff" opacity=".2"/>
                </svg>
                </div>
              </div>
            </div>
          </div>
          </div>



      <div className='review-input-group'>
        <label htmlFor="name">Name:</label>
        <input
          className='review-input bg-transparent text-light border-primary'
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='review-input-group align-items-start'>
        <label  style={{marginTop:"-50px"}} className='mb-5' htmlFor="comments">Comment:</label>
        <textarea
          className='review-input bg-transparent text-light border-primary'
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <div>
        <input 
          className='d-none'
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        
        
        <input 
          className='d-none'
          id="likes"
          type="likes"
          value={0}
          onChange={(e) => setLikes(e.target.value)}
        />


          <input 
          className='d-none'
          id="dislikes"
          type="dislikes"
          value={0}
          onChange={(e) => setDislikes(e.target.value)}
        />

      </div>
         </div>
            <div className="modal-footer">
              <button className='btn btn-primary'  onClick={handleSubmit} data-bs-dismiss="modal">Submit Review</button>
            </div>   </form>
          </div>
        </div>
        </div>

       
        {/* <SimilarProduct similarCategory={similarCategory} /> */}











              {/* custom product details  */}
          {/* <!-- Modal --> */}
          <div class="modal fade" id="customproductmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="customproductmodalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="bg-black border-0 text-light modal-content">
                <div class="bg-black border-0 text-light modal-header">
                  <h1 class="modal-title text-primary fs-5" id="customproductmodalLabel">Fill these:</h1>
                  <button type="button" className='bg-transparent border-0 text-primary'  data-bs-dismiss="modal" aria-label="Close"><i className="bi fs-4 fw-bold bi-x-lg"></i></button>
                </div>
             {product &&<div class="bg-black border-0 text-light modal-body">
           
           
              {product.textInscribed && <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label text-primary fw-bolder">Custom Text  ( max : 10 words)</label>
                <input class="form-control bg-transparent border-primary text-light" id="exampleFormControlTextarea1" rows="3"/>
              </div>}
                

              {product.custom && <div>
                 <label class="form-label text-primary fw-bolder" for="inputGroupFile01">Upload Image</label>
              <input type="file" class="form-control" id="inputGroupFile01"/>
           </div> }



                </div>}   
                <div class="bg-black border-0 text-light modal-footer">
              {Adding ?  <button disabled className='btn btn-secondary btn-lg'>Adding</button> : <button className='btn  rounded-pill btn-secondary' onClick={() => handleAddToCart(product, id)}>Add to Cart</button>}      
                </div>
              </div>
            </div>
          </div>


    </div>
  );
}

export default Paintingdetails;