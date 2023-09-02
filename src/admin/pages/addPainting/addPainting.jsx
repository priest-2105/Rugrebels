import React, { useState } from 'react';
import './addPainting.css';
import { useHistory } from 'react-router-dom';
import { db, storage } from '../../../backend/config/fire'; // Import the Firestore and Storage instances from your Firebase configuration
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary Storage functions
import { collection, addDoc } from 'firebase/firestore';


const AddPainting = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [artist, setArtist] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState();
  const [img, setImg] = useState('');
  const [tags, setTags] = useState([]);
  const [adding, setAdding] = useState(false); // new state for tracking if the painting is being added
  const history = useHistory();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const painting = { title, about, artist, date, img, price, tags };
  
    setAdding(true);
  
    try {
      const paintingsCollection = collection(db, 'paintings');
      await addDoc(paintingsCollection, painting);
  
      console.log('New painting added to Firestore');
      setAdding(false);
      history.push('/admindashboard');
    } catch (error) {
      console.error('Error adding painting:', error);
      setAdding(false);
    }
  };
  
  


  const handleImageChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    
    reader.onloadend = () => {
      setImg(reader.result); // Save the base64-encoded image temporarily
  
      // Upload the image to Firebase Cloud Storage
      const storageRef = ref(storage, 'paintings/' + file.name);
      uploadBytes(storageRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setImg(url); // Save the download URL
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    };
  
    reader.readAsDataURL(file);
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Parse the price input value as a number
    if (name === 'price') {
      setPrice(parseInt(value));
    } else {
      // For other input fields, set the value directly
      switch (name) {
        case 'title':
          setTitle(value);
          break;
        case 'about':
          setAbout(value);
          break;
        case 'artist':
          setArtist(value);
          break;
        case 'date':
          setDate(value);
          break;
        default:
          break;
      }
    }
  };


  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);}
    
  

  return (
    <div>
      {/* {preloader && <div className="preloader">...Loading </div>} */}

      <h2>Add Painting</h2>

      <form onSubmit={handleSubmit}>
        <label> Painting Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label> Painting Description: </label>
        <textarea
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <label>Artist : </label>
        <input
          required
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

      <label>Price : </label>
        <input
          required
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Date : </label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
        />

      <label>Tags: </label>
            <select
              multiple
              value={tags}
              onChange={handleTagChange}
              required
                  >
              <option value="homecover">Home Cover</option>
              <option value="top5">Top 5</option>
            </select>


        <button disabled={adding}> Add painting</button> {/* disable the button while the painting is being added */}
        {adding && <p className="notification" >Adding {title}...</p>} {/* display a message while the painting is being added */}
      </form>

      <p> {title}</p>
      <p> {artist}</p>
      <p> {about}</p>
      <p> {date}</p>
      <p>{price}</p>
      <p>{tags}</p>
      {img && <img src={img} alt="" />}
    </div>
  );
}

export default AddPainting;
