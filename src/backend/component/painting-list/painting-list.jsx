import './painting-list.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/fire';







const PaintingList = (props) => {
  const paintings = props.paintinglistprop;
  // const { data: paintings, preloader, error } = useFetch('http://localhost:8000/paintings'); 

  const [paintingsfirebase, SetPaintingsfirebase] = useState({}); 

  useEffect(() => {
    
  
  }, [ ] );


  function getpaintingsfirebase() {

    const paintingscollectinRef = collection(db, 'paintingsfirebase');
    getDocs(paintingscollectinRef)
    .then(response => { 
      console.log(response);
     })
    .catch(error => console.log(errormessage))

  }
 
  const [addedpaintinglist, setAddedpaintinglist] = useState(false); // new state for tracking if the painting is being addedpaintinglist
 
    const handlePaintingAddToCart = (painting) => {
  fetch('http://localhost:8000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(painting)
  })
    .then((response) => response.json())
    .then((data) => {
      setAddedpaintinglist(true);
      setTimeout(() => {
        setAddedpaintinglist(false);
      }, 3000);  
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

  
  return (
    <div className="painting-preview-container">
      {paintings.map((painting) => (
        <div className="painting-preview rounded" key={painting.id}>
          <Link to={`/paintings/${painting.id}`}>
            <img src={painting.img} className="rounded-top" alt="" />
            <h2>{painting.title}</h2>
          <h4>${painting.price}</h4>
            <p>{painting.about}</p>
            <span>Artist : {painting.artist}</span>
            <h5>{painting.date}</h5>
          </Link>
          
          <button className="cart-button" onClick={() => handlePaintingAddToCart(painting)}><i className="bi fs-1 bi-cart-fill"></i>Add to Cart</button>
          {addedpaintinglist && <p className="painting-list-notification" >Added To Cart </p>} 
          
         <Link to={`/paintings/${painting.id}`} className="view-button"> Quick View</Link>
        </div>
      ))}
    </div>
  );
};

export default PaintingList;
