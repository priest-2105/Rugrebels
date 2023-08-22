import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';



const Checkout = () => {
    
    
    // paystack key
    const publicKey = "pk_test_8968aa253c5faf3f2635d6a9ea3c2f9e2e5edcd5"

  const amount = 1000000 // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    // onSuccess: () =>
    //   alert("Thanks for doing business with us! Come back soon!!"),
    // onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }

    
    

    
    return (
        <div>
            

            

    
        
        
<div className="checkout-form">
  <div className="checkout-field">
    <label>Name</label>
    <input
      type="text"
      id="name"
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div className="checkout-field">
    <label>Email</label>
    <input
      type="text"
      id="email"
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="checkout-field">
    <label>Phone</label>
    <input
      type="text"
      id="phone"
      onChange={(e) => setPhone(e.target.value)}
    />
  </div>
  <PaystackButton target="_blank" className="paystack-button" {...componentProps} />
</div>
            




<h1> Paypal Shoes </h1>
  <h2>Buy For $25</h2>
  <form action="/pa" method="post">
    <input type="submit" value="Buy"/>
  </form>



        </div>
    );
}

export default Checkout;
