import React, { useEffect, useState } from 'react';
import './adminpaintinglist.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../../../backend/config/fire'; // Import the Firestore instance from your Firebase configuration

const Adminpaintinglist = () => {
  const [paintings, setPaintings] = useState([]);

  // Fetch paintings from Firestore on component mount
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const paintingsCollection = collection(db, 'paintings');
        const snapshot = await getDocs(paintingsCollection);
        const paintingData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPaintings(paintingData);
      } catch (error) {
        console.error('Error fetching paintings:', error);
      }
    };

    fetchPaintings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const paintingRef = doc(db, 'paintings', id);
      await deleteDoc(paintingRef);
      console.log('Painting deleted');
      // Refresh the list of paintings after deletion
      const updatedPaintings = paintings.filter((painting) => painting.id !== id);
      setPaintings(updatedPaintings);
    } catch (error) {
      console.error('Error deleting painting:', error);
    }
  };

  
  return (
    <div> 
      <div className="painting-grid">
        {paintings.map((painting) => (
          <div className="painting-container" key={painting.id}>
            <div className="admin-painting-preview rounded">
              <Link to={`/Adminpaintingpreview/${painting.id}`}>
                <img src={painting.img} alt=""/>
                {/* <img src={painting.imageUrl} alt={painting.title} /> */}
                <h2>{ painting.title}</h2>
                <h4>${painting.price}</h4>
                <p> { painting.about } </p>
                <span>By { painting.artist }</span>
                <h5>{ painting.date }</h5>
                <Link className='edit-button' to={`/editpaintings/${painting.id}`}>  Edit<i className="bi ms-2 bi-pencil-fill"></i></Link>
                <Link className="delete-button bg-danger" data-bs-toggle="modal" data-bs-target="#deletepaintingmodal"> Delete <i className="bi bi-trash3-fill"></i></Link>
              </Link>
            </div>

            {/* <!--Delete Modal Modal --> */}
            <div className="modal fade" id="deletepaintingmodal" tablndex="-1" aria-labelledby="deletepaintingmodalLabel" aria-hidden="true">
              <div className="modal-dialog border-danger">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="deletepaintingmodalLabel">Delete { painting.title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    Are You Sure You Want To Delete { painting.title}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button  className="btn btn-danger" onClick={handleDelete}>Delete painting</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Adminpaintinglist;
