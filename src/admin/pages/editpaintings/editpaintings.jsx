import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Await } from 'react-router-dom';
import './editpaintings.css';
import useFetch from '../../../assets/hooks/useFetch';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../../backend/config/fire';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';





const Editpaintings = () => {
  const { id } = useParams();
  // const { data: painting, error, preloader } 
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState([]); 
  const [moreImageloadingMessages, setMoreImageLoadingMessages] = useState([]); 
  const [quantityDisplay, setQuantityDisplay] = useState('off');
  const history = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState(0);
  const [inputCategory, setInputCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [matchingCategories, setMatchingCategories] = useState([]);



  const handleAddCategory = (selectedCategory) => {
    if (selectedCategory.trim() !== '') {
      setCategory(selectedCategory.trim());
      setInputCategory('');
    }
  };
  
  const handleCategoryInputChange = (e) => {
    const selectedCategory = e.target.value;
    setInputCategory(selectedCategory);
  
    setCategory(prevCategory => {
      if (prevCategory) {
        return prevCategory + ' ' + selectedCategory;
      } else {
        return selectedCategory;
      }
    });
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRef = collection(db, 'paintingcategories');
        const snapshot = await getDocs(categoriesRef);
        const categoriesData = snapshot.docs.map(doc => doc.data().categories).flat();  
        setAllCategories(categoriesData);
    
        setMatchingCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };   

    fetchData();
  }, []);

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };
  
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && inputValue.trim() !== '') {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    };
  
    const handleTagClick = (tag) => {
      setTags(tags.filter(t => t !== tag));
    };


    
  

  useEffect(() => {
    const getPaintingData = async () => {
      try {
        const docRef = doc(db, 'paintings', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const paintingData = docSnap.data();
          setTitle(paintingData.title);
          setAbout(paintingData.about);
          setArtist(paintingData.artist);
          setDate(paintingData.date);
          setPrice(paintingData.price);
          setQuantity(paintingData.quantity);
          setQuantityDisplay(paintingData.quantityDisplay);
          setImg(paintingData.img);
          setTags(paintingData.tags);
          setCategory(paintingData.categories);
        } else {
        }
      } catch (error) {
        console.error('Error fetching painting data:', error);
      }
    };

    getPaintingData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPainting = { title, about, artist, date, img, tags, category, quantity, quantityDisplay  };
    setSaving(true);
  
    try {
      const docRef = doc(db, 'paintings', id);
      await updateDoc(docRef, updatedPainting);
  
      console.log('Painting updated in Firestore');
      setSaving(false);
      history.push(`/paintings/${id}`);
    } catch (error) {
      console.error('Error updating painting:', error);
      setSaving(false);
    }
  };
 

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const newImages = []; 
    const messages = Array.from({ length: Math.min(files.length, 5) }, (_, index) => `Uploading image ${index + 1}...`);
    setLoadingMessages(messages);

 

    for (let i = 0; i < Math.min(files.length, 5); i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        newImages.push(downloadURL);
        setLoadedCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    setLoadingMessages([]);
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
    const messages = Array.from({ length: Math.min(files.length, 5) }, (_, index) => `Uploading image ${index + 1}...`);
    setMoreImageLoadingMessages(messages);

    
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
  
    setMoreImageLoadingMessages([]); 
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

  const handleDelete = () => {
    fetch(`https://rugrebelsdb.onrender.com/paintings/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("painting deleted");
        history.push(`/admindashboard`);
      })
      .catch((error) => {
        console.log("error deleting painting", error);
      }); 
  };

  // if (preloader) {
  //   return <div className="preloader">...Loading </div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);
  };
  
    

  return (
    <div>
        <Link style={{display:"flex", width:"fit-content",alignItems:"center"}} to="/admin/adminpaintinglist"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}> Painting Preview</h3></Link> 

        <div className="admin-add-product-container">


      <h2>Edit Painting</h2>

      <form className='edit-painting-form' onSubmit={handleSubmit}>

  
    <div className="add-product-input-group upload-image-input-group">  
    <label htmlFor=""></label>
    <label> Upload Media <button disabled data-title='Your Cover image will be the first and main picture of your product'> <i className="bi bi-question-circle-fill"></i> </button></label> <br/>
   
        <input
      className='input add-img-product-input'
      type="file"
      name="image"
      id="add-img-product-input"
      onChange={handleImageChange}
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
      {loadingMessages.map((message, index) => (
        <div className="initialImageloadingMessage image-upload-loader"></div>
      ))}
      {moreImageloadingMessages.map((message, index) => (
        <div className="image-upload-loader"></div>
      ))}      
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


    <div className="add-product-input-group">
        <label> Painting Title: </label><br/>
        <input
         className='input'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        </div>

        
    <div className="add-product-input-group">
        <label> Painting Description: </label><br/>
        <textarea
         className='input'
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        /></div>


  <div className="add-product-input-group">
          <label>Artist : </label><br/>
          <input
           className='input'
            required
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
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
        <label>Compare at Price ( Leave Blank if you don't want it displayed) : <button disabled data-title='To display a markdown, enter a value higher than your price. Often shown with a strikethrough (e.g. $̶2̶5̶.0̶0̶).'> <i className="bi bi-question-circle-fill"></i> </button>  </label><br/>
        <input
        className='input'
          value={compareAtPrice}
          type="number"
          onChange={(e) => setCompareAtPrice(e.target.value)}
        /></div>
        
        </div>

        <div className="add-product-input-group d-flex align-items-center">
            <div className="add-product-input-group-price-each">
              <label>Quantity : </label><br/>
                <input
                className='input'
                  required
                  value={quantity}
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                /></div>
                
                  <div className="checkbox-wrapper mt-3">
               <input  id="terms-checkbox-37" name="checkbox" type="checkbox"  checked={quantityDisplay === 'on'}
                    onChange={(e) => setQuantityDisplay(e.target.checked ? 'on' : 'off')}
                  />    <label className="terms-label" for="terms-checkbox-37">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className="checkbox-svg">
                      <mask fill="white" id="path-1-inside-1_476_5-37">
                        <rect height="200" width="200"></rect>
                      </mask>
                      <rect mask="url(#path-1-inside-1_476_5-37)" strokeWidth="40" className="checkbox-box" height="200" width="200"></rect>
                      <path strokeWidth="15" d="M52 111.018L76.9867 136L149 64" className="checkbox-tick"></path>
                    </svg>
                    <span className="label-text">Display Items Remaining in Stock (  {quantityDisplay}  )</span>
                  </label>
                </div>




            </div>
            
       
    <div className="add-product-input-group">
        <label>Date : </label><br/>
        <input
         className='input'
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /> </div>



        <div className="add-product-input-group position-relative">
          <label>Category: <button className='bg-transparent border-0' disabled data-title='Go to the General Settings Tab to add a new Category'> <i className="bi bi-question-circle-fill"></i> </button><br /></label>          
          <div>
        <select
      className='input'
      value={inputCategory}
      onChange={handleCategoryInputChange}
    >
      <option value="">Select a category</option>
      {matchingCategories.map((match, index) => (
        <option key={index} value={match}>
          {match}
        </option>
      ))}
    </select>

          </div>
        </div>




    <div className="add-product-input-group upload-image-input-group">
            <label>Tags: 
              <button disabled data-title='This Helps With SEO and also helps with search results ( Click to learn more )'> 
                <i className="bi bi-question-circle-fill"></i> 
              </button> 
            </label><br/>
            <input
              type="text"
              className='input'
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type and press Enter"
            />

    
       <div className="tagpills-container d-flex">
         {tags.map((tag, index) => (
          <div key={index} className="tag-pill rounded-pill bg-primary" onClick={() => handleTagClick(tag)}>
            {tag} <i className="bi bi-x"></i>
          </div>
        ))}  <div></div>      </div>
      </div>


        <button className="btn mt-3" disabled={saving}> Save painting</button>
        {saving && <p className="notification" >Saving {title}...</p>}

        {/* <!-- Delete trigger modal --> */}
        <button type="button" className="btn mt-3 ms-4 bg-danger btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Delete
      </button>
      </form>

    
    
    



   

{/* <!-- Delete Modal --> */}
<div className="modal fade " id="exampleModal" tablndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog ">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Are you sure you want to Delete ?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button className='btn btn-danger bg-danger' onClick={handleDelete}>Delete painting</button>
      </div>
    </div>
  </div>
</div>

    
    
    
    
    
    </div>
  

  
  
  </div>  
  )
};

export default Editpaintings;
