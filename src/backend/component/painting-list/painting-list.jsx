import './painting-list.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PaintingList = (props) => {
  const paintings = props.paintinglistprop;

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    fetch('http://localhost:8000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paintings)
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAdded(true);
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
            <p>{painting.about}</p>
            <span>Artist : {painting.artist}</span>
            <h5>{painting.date}</h5>
          </Link>
          <button className="cart-button" onClick={() => handleAddToCart(painting)}><i className="bi fs-1 bi-cart-fill"></i>Add to Cart</button>
          {isAdded && (
            <div className="popup">
              Item added to cart!
              <button onClick={() => setIsAdded(false)}>Close</button>
            </div>
          )}
         <Link to={`/paintings/${painting.id}`} className="view-button"> Quick View</Link>
        </div>
      ))}
    </div>
  );
};

export default PaintingList;
