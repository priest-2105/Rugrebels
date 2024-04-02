import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../../backend/config/fire'; 7
import './home.css';


const Home = () => {

    const [paintings, setPaintings] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);  
    const [loading, setLoading] = useState(true); 

    
    useEffect(() => {
      const fetchPaintings = async () => {
        try {
          const paintingsCollectionRef = collection(db, 'paintings');
          const querySnapshot = await getDocs(paintingsCollectionRef);
          const paintingsData = querySnapshot.docs.map((doc) => doc.data());
  
          const homeCoverPaintings = paintingsData.filter(
            (painting) => painting.tags && painting.tags.includes('homecover')
          );
  
          setPaintings(homeCoverPaintings);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching paintings:', error);
          setLoading(false);
        }
      };
  
      fetchPaintings();
    }, []);

  // Handle clicking on tab buttons
  const handleTabClick = (index) => {
    setActiveIndex(index); // Update the active index
  };

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <div>
    <div className="home-top">
      <ul className="nav nav-pills text-danger mb-3 home-top-nav-pills" id="pills-tab" role="tablist"> 
        {paintings.map((painting, index) => (
          <li className="nav-item" key={painting.id} role="presentation">
            <button
              className={`nav-link home-top-nav-link bg-transparent ${
                index === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleTabClick(index)} // Call the click handler
              type="button"
              role="tab"
              aria-controls={`pills-${painting.id}`}
              aria-selected={index === activeIndex}
            >
              {painting.title} 
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content home-top-tab-content" id="pills-tabContent">
        {paintings.map((painting, index) => (
          <div
            key={painting.id}
            style={{
              backgroundImage: `url(${painting.img})`,
            }}
            className={`tab-pane home-top-tab-pane fade ${
              index === activeIndex ? 'show active' : ''
            }`}
            id={`pills-${painting.id}`}
            role="tabpanel"
            aria-labelledby={`pills-${painting.id}-tab`}
            tabIndex="0"
          >
             <div className="home-top-painting-details">
                <h2>{painting.title}</h2>
                <h5>${painting.price}</h5>
                <Link to={`/paintings/${painting.id}`} >View in Store</Link>
              </div>
          </div>
        ))}
      </div>
    </div>




  </div>
  );
};

export default Home;