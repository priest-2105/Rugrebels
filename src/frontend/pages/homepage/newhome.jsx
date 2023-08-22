import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Newhome = () => {
  const [paintings, setPaintings] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active painting index

  useEffect(() => {
    // Fetch paintings data from your API endpoint
    fetch('https://rugrebelsdb.onrender.com/paintings')
      .then((response) => response.json())
      .then((data) => {
        const homeCoverPaintings = data.filter(
          (painting) => painting.tags && painting.tags.includes('homecover')
        );
        setPaintings(homeCoverPaintings); // Update the state with filtered data
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Handle clicking on tab buttons
  const handleTabClick = (index) => {
    setActiveIndex(index); // Update the active index
  };

  return (
    <div>
      <div className="home-top">
        <ul className="nav nav-pills text-danger mb-3 home-top-nav-pills" id="pills-tab" role="tablist">
          {/* Map the paintings data to create tab buttons */}
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
                <Link to="/store">View in Store</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newhome;
