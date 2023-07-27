import React from 'react';
import useFetch from '../../../assets/hooks/usefetch';
import Cart from '../carts/cart';


const Cartlist = () => {
    

    
    const { data: Cart } = useFetch('https://rugrebelsdb.onrender.com/cart');

    return (
        <div>

   <h5>   Cart List   </h5>            


  {/* painting list prop      */}
  {Cart && <Cart cartlistprop={Cart} />} 
  

        </div>
    );
}

export default Cartlist;
