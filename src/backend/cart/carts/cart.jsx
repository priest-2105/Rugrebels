import './cart.css';
import React, { useState, useEffect } from 'react';
import { auth } from '../../config/fire';
import { db } from '../../config/fire'; 
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const Cart = () => {
  const [removed, setRemoved] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading state to true initially

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const cartItemsRef = collection(db, 'carts', userId, 'items');

      getDocs(cartItemsRef)
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setCartItems(items);

          const calculatedTotalPrice = items.reduce((acc, curr) => {
            const itemPrice = typeof curr.paintingPrice === 'string' ? parseFloat(curr.paintingPrice) : curr.paintingPrice;
            return acc + itemPrice;
          }, 0);
          setTotalPrice(calculatedTotalPrice);
          
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
          setLoading(false); 
        });
    }
  }, []);

  const handleRemove = (itemId) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const cartItemRef = doc(db, 'carts', userId, 'items', itemId);
  
      deleteDoc(cartItemRef)
        .then(() => {
          console.log('Item removed from cart!');
          setRemoved(true);
          setTimeout(() => {
            setRemoved(false);
          }, 3000);
          // After successful removal, update the cart items state
          setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== itemId));
        })
        .catch((error) => {
          console.error('Error removing item from cart:', error);
        });
    } else {
      console.log('User is not authenticated');
    }
  };
  
  
  return (
    <div className="cart-container">
      {loading ? (
      <p>Loading cart items...</p>
    ) : (
      <>
      
     
     {cartItems.length > 0 ? (   
     <div className="cart-items-container">
    
    {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.paintingImage} alt="" />
            <div>
              <h3>{item.paintingTitle}</h3>
              <p>{item.paintingArtist}</p>
              <p>Price: ${item.paintingPrice}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
              {removed && <p className="notification">Painting Removed</p>}
            </div>
          </div>
        ))}
        </div>
    ) : (
  <p>Your cart is empty</p>
)}

        {/* {cartItems.length === 0 && <p>Your cart is empty</p>} */}
        
     
      <div className="cart-total-container">
        <h2>Total Price: ${totalPrice}</h2>
        <button>Checkout</button>
      </div>
      </>
    )}  </div>
  );
};

export default Cart;
