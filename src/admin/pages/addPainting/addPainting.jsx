import React, { useState } from 'react';
import './addPainting.css';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../../backend/config/fire'; // Import the Firestore and Storage instances from your Firebase configuration
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary Storage functions
import { collection, addDoc } from 'firebase/firestore';


const AddPainting = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [artist, setArtist] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [price, setPrice] = useState(0);
  const [compareAtPrice, setCompareAtPrice] = useState(0);
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [adding, setAdding] = useState(false);
 
  
  const history = useNavigate();

    const generateStockNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    return `#${randomLetter}${randomLetter}${randomNumbers}`;
  }; const [stockNumber, setStockNumber] = useState(generateStockNumber());

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockNumber = document.getElementById('stockNumber').value;
  
    const painting = {
      title,
      about,
      artist,
      date,
      compareAtPrice,
      img, 
      price,
      tags,
      stockNumber
    };
  
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
  
 const handleRegenerateStockNumber = () => {
    setStockNumber(generateStockNumber());
  }; 

 

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const newImages = [];
  
    for (let i = 0; i < Math.min(files.length, 5); i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        newImages.push(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  
    setImg(newImages);
  };
  
  


  const handleCoverImageChange = (index) => {
    const newImages = [...img];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImg(newImages);
  };
  const handleMoreImagesChange = async (e) => {
    const files = e.target.files;
    const newImages = [];
    
    for (let i = 0; i < Math.min(files.length, 5); i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        newImages.push(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  
    setImg(prevImages => [...prevImages, ...newImages]);
  };
  

  const handleClearImages = () => {
    setImg([]);
  }

  const handleRemoveImage = (index) => {
    const newImages = [...img];
    newImages.splice(index, 1);
    setImg(newImages);
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
        case 'compareAtPrice':
          setCompareAtPrice(value);
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

      <div className="admin-add-product-container">

      <h2>Add Painting</h2>


    <div className="admin-add-product">
         <form onSubmit={handleSubmit}>
      
      
      
      <div className="add-product-input-group">
        <label> Painting Title:  </label><br/>
        <input
        className='input'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Short sleeve shirt'
          required
        /> <br/>
        
        <div className="add-product-input-group-price-each">
         <label> Painting Description: <button disabled data-title='Drag textarea to increase height, if you have a longer product description'> <i className="bi bi-question-circle-fill"></i> </button>  </label><br/>
        <textarea
          placeholder='Important details about the product'
        className='input'
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>  </div>


    <div className="add-product-input-group upload-image-input-group">  
    <label htmlFor=""></label>
    <label> Upload Media <button disabled data-title='Your Cover image will be the first and main picture of your product'> <i className="bi bi-question-circle-fill"></i> </button></label> <br/>
   
        <input
      className='input add-img-product-input'
      type="file"
      name="image"
      id="add-img-product-input"
      onChange={handleImageChange}
      required
      multiple
      style={{ display: img.length === 0 ? 'block' : 'none' }}
    />  <div className="add-paintings-image-preview">
      {img.map((image, index) => (
    <div  key={index} className={index === 0 ? 'dashboard-input-upload-larger-image' : 'dashboard-input-upload-smaller-image'}>
      <input
        type="checkbox"
        name={`dashboard-media-upload-input-cover-${index}`}
        id={`dashboard-media-upload-input-cover-${index}`}
        checked={index === 0}
        onChange={() => handleCoverImageChange(index)}
        />
         <img src={image} alt="" />
         <button className="dashboard-delete-one-uploded-image" type='button' onClick={() => handleRemoveImage(index)}> Remove</button>
         <label htmlFor={`dashboard-media-upload-input-cover-${index}`} className='dashboard-image--cover-info'> <p></p> </label>
        
      </div> ))}
      {img.length >= 1 && (<label className='dashboard-upload-more-images' htmlFor="add-more-images-input"> <i className="bi bi-plus"></i> </label>)}
      {img.length >= 1 && (<button type="button" className='clear-uploaded-images-button' onClick={handleClearImages}>Clear All<br/> <i className="bi bi-trash"></i> </button>)}
     <input
          type="file"
          name="moreImages"
          id="add-more-images-input"
          onChange={handleMoreImagesChange}
          multiple
          style={{ display: 'none' }} 
        />   </div>
 
    </div>


    <div className="add-product-input-group d-flex">
    <div className="add-product-input-group-price-each">
      <label>Price : </label><br/>
        <input
        className='input'
          required
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        /></div>
        
        <div className="add-product-input-group-price-each">
        <label>Compare at Price : <button disabled data-title='To display a markdown, enter a value higher than your price. Often shown with a strikethrough (e.g. $̶2̶5̶.0̶0̶).'> <i className="bi bi-question-circle-fill"></i> </button>  </label><br/>
        <input
        className='input'
          value={compareAtPrice}
          type="number"
          onChange={(e) => setCompareAtPrice(e.target.value)}
        /></div>
        
        </div>


      <div className="add-product-input-group">
        <label>Artist : </label><br/>
        <input
        className='input'
          required
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        /></div>


      <div className="d-none add-product-input-group">
        <label>Date : </label><br/>
        <input
        className='input'
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
    </div>


    <div className="add-product-input-group">
      <label>Tags: </label><br/>
            <select
              multiple
              value={tags}
              onChange={handleTagChange}
              required
                  >
              <option value="homecover">Home Cover</option>
              <option value="top5">Top 5</option>
            </select>
     
     
         <input
        type="hidden"
        id="stockNumber"
        value={generateStockNumber()} 
      />
      </div>
      <button type="button" onClick={handleRegenerateStockNumber}>
  Generate New Stock Number
</button>


        <button disabled={adding}> Add Painting</button> {/* disable the button while the painting is being added */}
        {adding && <p className="notification" >Adding {title}...</p>} {/* display a message while the painting is being added */}
      </form>
    </div>
   

      <p> {title}</p>
      <p> {artist}</p>
      <p> {about}</p>
      <p> {date}</p>
      <p>{price}</p>
      <p>{tags}</p>
      {img.map((image, index) => (
    <div key={index}>
         <img src={image} alt="" /> 
      </div> ))}


    </div>
    
    
    
    </div>
  );
}

export default AddPainting;
