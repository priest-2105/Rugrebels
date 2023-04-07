import './cart.css';
import { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [removed, setRemoved] = useState(false); // new state for tracking if the painting is being added


  useEffect(() => {
    fetch('http://localhost:8000/cart')
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const totalPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);



  
  const handleRemove = (id) => {
    fetch(`http://localhost:8000/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Painting Removed");
        // Reload the cart items after removing the item
        fetch('http://localhost:8000/cart')
          .then(response => response.json())
          .then(data => {
            setCartItems(data);
            setRemoved(true);
            setTimeout(() => {
              setRemoved(false);
            }, 3000); 
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.log("error removing painting", error);
      });
  };
  

  

  return (
    <div className="cart-container">
      {/* <h1>Cart</h1> */}
      <div className="cart-items-container">
        {cartItems.length === 0 && <p>Your cart is empty</p>}
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.img} alt="" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.about}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
              {removed && <p className="notification" >Painting Removed</p>}  
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total-container">
        <h2>Total Price: ${totalPrice}</h2>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
