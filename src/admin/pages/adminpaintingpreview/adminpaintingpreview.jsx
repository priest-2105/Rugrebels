import './adminpaintingpreview.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../backend/config/fire'; // Import your Firestore instance from Firebase configuration
import { doc, getDoc } from 'firebase/firestore';


const Adminpaintingpreview = () => {
  const { id } = useParams();

  // Get the painting document reference
  const paintingRef = doc(db, 'paintings', id);

  // Use the react-firebase-hooks to fetch the painting document
  const [paintingSnapshot, loading, error] = useDocument(paintingRef);

  // Extract painting data from the snapshot
  const painting = paintingSnapshot?.data();

  return (
    <div>
      <h2>Preview Painting</h2>

      {error && <div>{error.message}</div>}

      {/* Preloader */}
      {loading && <div className='preloader'>...Loading</div>}

      {painting && (
        <div>
          <h2>{painting.title}</h2>
          <img src={painting.img} alt="painting" />
          <p>{painting.about}</p>
          <span>{painting.artist}</span>
          <h5>{painting.artist}</h5>
          <Link to={`/editpaintings/${id}`}>Edit</Link>
        </div>
      )}
    </div>
  );
};

export default Adminpaintingpreview;
