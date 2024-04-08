import React, { useEffect, useState } from 'react';
import './gallery.css'
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../../backend/config/fire'; 






const GalleryCard = () => {
        
    
    
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rotation, setRotation] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

  
  
  
  

    const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      const rotationChange = deltaX * 0.05;
      setRotation(rotation + rotationChange);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  
 

 
    const handleRotateLeft = () => {
      setRotation(rotation + 45);
    };
  
    const handleRotateRight = () => {
      setRotation(rotation - 45);      
    };



      const handleMouseMoveBox = (event) => {
    const deltaX = event.clientX - window.innerWidth / 2;
    const deltaY = event.clientY - window.innerHeight / 2;
    const box = document.querySelector('.box');

    box.style.transform = `translate(${deltaX * 0.1}px, ${deltaY * 0.1}px)`;
  };

  document.addEventListener('mousemove', handleMouseMoveBox);





                    
            useEffect(() => {
                const fetchPaintings = async () => {
                try {
                    const paintingsCollectionRef = collection(db, 'paintings');
                    const querySnapshot = await getDocs(paintingsCollectionRef);
                    const paintingsData = querySnapshot.docs.map((doc) => doc.data());
                    setPaintings(paintingsData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching paintings:', error);
                    setLoading(false);
                }
                };

                fetchPaintings();
            }, []);

            if (loading) {
                return <div>Loading...</div>;
            }

    
    return (
        <div className='gallery-body'>
            Gallery

            <div className="box"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
            {paintings.slice(0, 8).map((painting, index) => (
        <span
          key={painting.id}
          style={{
            transform: `rotateY(${rotation}deg) rotateY(${index * 45}deg) translateZ(400px)`,
            transitionTimingFunction:'ease-out',
            transitionDuration:'0.89s',
            WebkitBoxReflect: 'below 0px linear-gradient(transparent,transparent, #8884)',
          }}
        >
          <img src={painting.img} alt={`Painting ${index + 1}`} />
        </span>
      ))}
    </div>    
    <button  className='gallery-rotate-button rotate-left' onClick={handleRotateLeft}>Rotate Left</button>
      <button className='gallery-rotate-button rotate-right' onClick={handleRotateRight}>Rotate Right</button>
  
 
   
        </div>
    );
}

export default GalleryCard;