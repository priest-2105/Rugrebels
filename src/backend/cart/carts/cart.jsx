import { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items from server on component mount
    fetch('http://localhost:8000/cart')
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h5>Cart</h5>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map((item) => (
        <div key={item.id}> 
          <img src={item.img} alt="" />
          <h2>{item.title}</h2>
          <p>{item.about}</p>
          <span>By {item.artist}</span> 
        </div>
      ))}
    </div>
  );
};

export default Cart;
