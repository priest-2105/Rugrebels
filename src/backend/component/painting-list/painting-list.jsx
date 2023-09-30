import './painting-list.css';
import { Link } from 'react-router-dom';
import {  useEffect, useRef, useState } from 'react';
import { db, auth } from '../../../backend/config/fire';  
import { collection, addDoc } from 'firebase/firestore';
import SmoothScroll from '../../../../Pagescrolll/smoothscroll/smoothscroll';


const PaintingList = (props) => {

 
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const paintings = props.paintinglistprop;
  const [isAdded, setIsAdded] = useState(false);



   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

      useEffect(() => {
        if (isIntersecting) {
          ref.current.querySelectorAll("div").forEach((el) => {
            el.classList.add("slide-in");
          });
        } else {
          ref.current.querySelectorAll("div").forEach((el) => {
            el.classList.remove("slide-in");
          });
        }
      }, [isIntersecting]);
      


  const handleAddToCart = async (painting) => {
     
  
  try {
      if (!auth.currentUser) {
        console.log('User is not authenticated');
        return;
      }

      const userId = auth.currentUser.uid;
      const cartItemsRef = collection(db, 'carts', userId, 'items');
      
      await addDoc(cartItemsRef, painting);
      
      setIsAdded(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };



  const truncateText = (text, wordCount) => {
    const words = text.split(' ');
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + '...';
    }
    return text;
  };

  
 


  return (
  // <SmoothScroll>
  <div className="painting-preview-container shop-items-container" ref={ref}>
      {paintings.map((painting) => (
     <div  className={`painting-preview image vh-fix child-one${isIntersecting ? ' animate' : ''}`}
     style={{
      backgroundImage: `url(${painting.img[0]})`,
    }}
     key={painting.id}>
             <button className="cart-button" onClick={() => handleAddToCart(painting)}>
            Add to Cart<i className="bi  bi-cart-fill"></i>
          </button>  
          <div className="preview-details"> 
          {/* <Link to={`/paintings/${painting.id}`}> */}
            {/* <img src={painting.img} className="rounded-top" alt="" /> */}
            <h2>{painting.title}</h2>
            <h4>${painting.price} - <b>${painting.compareAtPrice}</b> </h4>
            <p>{truncateText(painting.about, 25)}</p> 
            
         {/* <span>  {painting.date}</span> */}
          {/* </Link> */}
        
          {isAdded && (
            <div className="popup">
              Item added to cart!
              <button onClick={() => setIsAdded(false)}>Close</button>
            </div>
          )}
          <Link to={`/paintings/${painting.id}`} className="view-button">
            Preview
          </Link>  
          <h5>Artist : {painting.artist}</h5>
         </div>
        </div>
      ))}    
      <div className={`child-one${isIntersecting ? ' animate' : ''}`}>Child One</div>
        <div className={`child-two${isIntersecting ? ' animate' : ''}`}>Child Two</div>
   
    </div>
    // </SmoothScroll>
  );
};

export default PaintingList;
