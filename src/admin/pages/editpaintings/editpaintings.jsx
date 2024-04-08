import './editpaintings.css'
import  { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../../backend/config/fire';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';





const Editproducts = () => {
  const { id } = useParams();
  // const { data: product, error, preloader } 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState([]); 
  const [moreImageloadingMessages, setMoreImageLoadingMessages] = useState([]); 
  const [quantityDisplay, setQuantityDisplay] = useState('off');
  const history = useNavigate();
  const [custom, setCustom] = useState(false);
  const [textInscribed, setTextInscribed] = useState(false);
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().slice(0, 10));
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [pricePerWeight, setPricePerWeight] = useState(0);
  const [compareAtPrice, setCompareAtPrice] = useState(0);
  const [priceType, setPriceType] = useState('weight');
  const [weightType, setWeightType] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [availability, setAvailability] = useState('true');
  const [showQuantity, setShowQuantity] = useState(false);



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
  
  


  const handleCustomChange = (e) => {
    setCustom(e.target.checked);
  }

  const handletextInscribedChange = (e) => {
    setTextInscribed(e.target.checked);
  }

  const generateStockNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    return `#${randomLetter}${randomLetter}${randomNumbers}`;
  }; const [stockNumber, setStockNumber] = useState(generateStockNumber());
 
  const handleRegenerateStockNumber = () => {
    setStockNumber(generateStockNumber());
  }; 

 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRef = collection(db, 'productcategories');
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


     
    

  const handleAddTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };



    

  const handleCheckboxChange = (e) => {
    setShowQuantity(e.target.checked);
  }

    
  

  useEffect(() => {
    const getproductData = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setTitle(productData.title);
          setDescription(productData.description);
          setDate(productData.date);
          setPriceType(productData.priceType);
          setPricePerUnit(productData.pricePerUnit);
          setPricePerWeight(productData.pricePerWeight);
          setWeightType(productData.setWeightType);
          setQuantity(productData.quantity);
          setAvailability(productData.availability);
          setStockNumber(productData.stockNumber);
          setShowQuantity(productData.showQuanitity);
          setQuantityDisplay(productData.quantityDisplay);
          setImg(productData.img);
          setTags(productData.tags);
          setCategory(productData.category);
          setCustom(productData.custom)
          setTextInscribed(productData.textInscribed)
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    getproductData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedproduct = { title, about, artist, date, img, tags, category, quantity, quantityDisplay, custom , textInscribed  };
    setSaving(true);
  
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, updatedproduct);
  
      console.log('product updated in Firestore');
      setSaving(false);
      history.push(`/products/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
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

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);
  };
  
    

  return (
    <div>
        <Link style={{display:"flex", width:"fit-content",alignItems:"center"}} to="/tfghjkdyfrgehrtkmebvgc4k6lm54j3hgvfc46kl54m3jh2gfd3gh4jk5l6k5j4hb3gf2dfg3hj4k5l/admin/adminproductlist"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}>Edit Product </h3></Link> 

        <div className="admin-add-product-container">


      <h2>Edit product</h2>
  
      <form className='edit-product-form' onSubmit={handleSubmit}>

        
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
          />  <div className="add-products-image-preview">
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
              <div key={message.id} className="initialImageloadingMessage image-upload-loader"></div>
            ))}
            {moreImageloadingMessages.map((message, index) => (
              <div key={message.id} className="image-upload-loader"></div>
            ))}      
            {img.length >= 1 && (<label className='dashboard-upload-more-images' htmlhtmlFor="add-more-images-input"> <i className="bi bi-plus"></i> </label>)}
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
              <label> product Title: </label><br/>
              <input
              className='input'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

              
          <div className="add-product-input-group">
              <label> product Description: </label><br/>
              <textarea
              className='input'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              /></div>


<div className="form-group d-block">
  <label className='mt-5 fs-5 fw-bold mb-3' htmlFor="Price">Price</label>
  <div className="form-group-price-type">
    <label className='me-2' htmlFor='pricetypeunit'>Per Unit</label><br/>
    <input
      type="radio"
      name="priceType"
      value="unit"
      id='pricetypeunit'
      className='d-block me-4'
      checked={priceType === 'unit'}
      onChange={() => {
        setPriceType('unit');
        setPricePerUnit(''); 
        setWeightType('')
        
      }}
    />
    <label className='me-2' htmlFor="pricetypeweight">Per Weight</label><br/>
    <input
      type="radio"
      name="priceType"
      className='d-block'
      id='pricetypeweight'
      value="weight"
      checked={priceType === 'weight'}
      onChange={() => {
        setPriceType('weight');
        setPricePerWeight('');
      }}
    />
  </div>
</div>

    <div className="d-flex">
    
      {priceType === 'unit' && (
        <div className="form-group-price-each">
          <label>Unit Price : </label><br/>
          <input
            className='input form-control'
            required
            value={pricePerUnit}
            type="number"
            onChange={(e) => setPricePerUnit(e.target.value)}
          />
        </div>
      )}

      {priceType === 'weight' && (
        <div className="form-group form-group-price-each mb-3">
          <label >Price Per Weight</label><br/>
          <input
            className='input form-control'
            required
            type="number"
            value={pricePerWeight}
            onChange={(e) => setPricePerWeight(e.target.value)}
          />
          <select
          name="productweight"
          id="productweight"
          value={weightType}
          onChange={(e) => setWeightType(e.target.value)}
        > 
          <option value="" >Select a weight</option>
          <option value="KG">KG</option>
          <option value="gramme">Gramme</option>
          <option value="ounce">Ounce</option>
          <option value="pound">Pound</option>
        </select>     
      </div>  
      )}


        <div className="form-group mb-4">
          <div className="form-group-price-each">
                <label>Compare at Price : <button disabled data-title='To display a markdown, enter a value higher than your price. Often shown with a strikethrough (e.g. $̶2̶5̶.0̶0̶).'> <i className="bi bi-question-circle-fill"></i> </button>  </label><br/>
                <input
                className='input form-control'
                  value={compareAtPrice}
                  type="number"
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                /></div>
        </div>      
        </div>  

      <div className="form-group form-group-price-each mb-3">
        <label  className='mt-3 fs-5 fw-bold mb-3'>Quantity : {pricePerUnit && ' ' +  'in Units'} {weightType &&  'In'} {weightType} </label><br/>
        <input
        className='input form-control'
          required
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        /></div>  
        <div>
        <label htmlFor="showquantity">Show Quantity</label>
        <input
        className='ms-2 mt-1'
          type="checkbox"
          name="showquantity"
          id="showquantity"
          checked={showQuantity}
          onChange={handleCheckboxChange}
        />
        <div>
          {/* {showQuantity ? 'Yes' : 'No'} */}
        </div>
      </div>



      <div className="d-none form-group">
        <label>Date : </label><br/>
        <input
        className='input form-control'
          type="date"
          required
          value={dateAdded}
          onChange={(e) => setDateAdded(e.target.value)}
        />
    </div>


      <div className="form-group form-group-price-each mb-3">
        <label  className='mt-3 fs-5 fw-bold mb-3'>Product Category : </label><br/>
                  <select
          name="productcategory"
          id="productcategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        > 
          <option value="" selected disabled>Select a category</option>
          <option value="livestock">Livestock</option>
          <option value="frozen">Frozen</option>
          <option value="bundles">bundles</option>
        </select>     
      </div>


      <div className="form-group form-group-price-each mb-3">
        <label className="mt-2 fs-5 fw-bold mb-3">Tags: </label><br />
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleAddTag}>Add Tag</button>
        </div>
        <div className='d-flex mt-3 mt-3' style={{flexWrap:"wrap"}}>
          {tags.map((tag, index) => (
            <div key={index} className="add-produt-tag rounded-pill me-2 mb-2 btn-success btn btn-sm">
               <button type="button" onClick={() => handleRemoveTag(index)}> {tag} <i className="text-danger bi bi-x-lg"></i>
           </button>
            </div>
          ))}
        </div>
      </div>
   



      <div className="form-group form-group-price-each ">
        <label htmlFor="custom">Custom Frame : <button disabled data-title='Allows customers to upload a media if its a custom frame'> <i className="bi bi-question-circle-fill"></i> </button> </label>
        <input
        className='me-4 mt-1'
          type="checkbox"
          name="custom"
          id="custom"
          checked={custom}
          onChange={handleCustomChange}
        />
        <div>
          {/* {custom ? 'Yes' : 'No'} */}
        </div>
      </div>


      <div className="form-group form-group-price-each ">
        <label htmlFor="textInscribed">Text Inscribed : <button disabled data-title='Allows customers to upload a media if its a custom frame'> <i className="bi bi-question-circle-fill"></i> </button> </label>
        <input
        className='me-4 mt-1'
          type="checkbox"
          name="textInscribed"
          id="textInscribed"
          checked={textInscribed}
          onChange={handletextInscribedChange}
        />
        <div>
          {/* {textInscribed ? 'Yes' : 'No'} */}
        </div>
      </div>







       <div  className="form-group d-none form-group-price-each mb-3">
        <label htmlFor="">Stock Number <button disabled data-title='The stock Number is Auto-generated you can regenerate a new stock number'> <i className="bi bi-question-circle-fill"></i> </button> </label> 
         <br/>
         <input type="text"
        id="stockNumber"
        readOnly
        value={generateStockNumber()} 
      />
       <button type="button" className='btn-secondary btn-sm btn ms-2 rounded-pill' onClick={handleRegenerateStockNumber}>Generate New Stock Number</button>
      
   </div>
   

              <button className="btn mt-3" disabled={saving}> Save product</button>
              {saving && <p className="notification" >Saving {title}...</p>}

              {/* <!-- Delete trigger modal --> */}
              <button type="button" className="btn mt-3 ms-4 bg-danger btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Delete
            </button>

      </form>

    
    
    



   

    {/* <!-- Delete Modal --> */}
    <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <button className='btn btn-danger bg-danger'>Delete product</button>
          </div>
        </div>
      </div>
    </div>

    
    
    
    
    
    </div>
  

  
  
  </div>  
  )
};

export default Editproducts;
