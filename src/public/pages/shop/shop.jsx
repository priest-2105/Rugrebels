import React, { useState, useEffect } from 'react';
import useFetch from '../../../assets/hooks/usefetch';
import PaintingList from '../../../backend/component/painting-list/painting-list';
import { useLocation } from 'react-router-dom';
import './shop.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../backend/config/fire';




 
 

const Shop = () => {

  
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  // Fetch paintings from Firebase
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const paintingsCollectionRef = collection(db, 'paintings');
        const querySnapshot = await getDocs(paintingsCollectionRef);

        const paintingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPaintings(paintingsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  


  return (
    <div>
      <h5>SHOP</h5>

      {error && <div>{error.message}</div>}

      {loading && (
        <div className='preloader'>
          <div className="container">
            <canvas id="canvas"></canvas>
          </div>
        </div>
      )}

     


      {/* Pass paintings to PaintingList */}
      {!loading && !error && <PaintingList paintinglistprop={paintings} userEmail={userEmail} />}
  </div>
  );
};

export default Shop;
