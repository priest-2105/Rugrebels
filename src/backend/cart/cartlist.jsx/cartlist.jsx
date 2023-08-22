import React, { useState, useEffect } from 'react';
import Cart from '../carts/cart';
import { collection } from 'firebase/firestore';
import { db } from '../../config/fire';

const Cartlist = () => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const cartRef = db.collection('carts').doc(userId).collection('items');

            const unsubscribe = cartRef.onSnapshot((querySnapshot) => {
                const items = querySnapshot.docs.map((doc) => doc.data());
                setCartData(items);
            });

            return () => {
                unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
            };
        }
    }, []);

    return (
        <div>
            <h5>Cart List</h5>
            {cartData && <Cart cartData={cartData} />}
        </div>
    );
}

export default Cartlist;
