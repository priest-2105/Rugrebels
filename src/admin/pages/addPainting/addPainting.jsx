import React, { useState } from 'react';
import './addPainting.css';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../../backend/config/fire'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { collection, addDoc } from 'firebase/firestore';
import { Editor } from '@tinymce/tinymce-react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




const AddPainting = () => {
  
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().slice(0, 10));
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [pricePerWeight, setPricePerWeight] = useState(0);
  const [compareAtPrice, setCompareAtPrice] = useState(0);
  const [img, setImg] = useState([]);
  const [availability, setAvailability] = useState('true');
  const [adding, setAdding] = useState(false);
  const [priceType, setPriceType] = useState('weight');
  const [weightType, setWeightType] = useState('');
  const [remaining, setRemaining] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showQuantity, setShowQuantity] = useState(false);
  const [custom, setCustom] = useState(false);
  const [stripelink, setStripelink] = useState("")
  const [textInscribed, setTextInscribed] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [amountsold, setAmountsold] = useState(0);




  const handleCheckboxChange = (e) => {
    setShowQuantity(e.target.checked);
  }

  const handleCustomChange = (e) => {
    setCustom(e.target.checked);
  }

  const handletextInscribedChange = (e) => {
    setTextInscribed(e.target.checked);
  }


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  const history = useNavigate();


  

// swiper js 
const [thumbsSwiper, setThumbsSwiper] = useState(null);



    const generateStockNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    return `#${randomLetter}${randomLetter}${randomNumbers}`;
  }; const [stockNumber, setStockNumber] = useState(generateStockNumber());

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockNumber = document.getElementById('stockNumber').value;
    
    const product = {
      title,
      description,
      dateAdded,
      compareAtPrice,
      img, 
      pricePerUnit,
      pricePerWeight,
      tags,
      priceType,
      availability,
      stockNumber,
      weightType,
      category,
      showQuantity,
      amountsold,
      status : "Active",
      remaining : quantity,
      custom,
      stripelink,
      textInscribed,
    };
  
    setAdding(true);
  
    try {
      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, product);
  
      console.log('New product added to Firestore');
      setAdding(false);
      setShowModal(false);
      history(`/admin/products/`);} catch (error) {
      console.error('Error adding product:', error);
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
    if (name === 'pricePerUnit' || name === 'pricePerWeight') {
      setPricePerUnit(parseInt(value));
      setPricePerWeight(parseInt(value));
    } else {
      // For other input fields, set the value directly
      switch (name) {
        case 'title':
          setTitle(value);
          break;
        case 'description':
          setDescription(value);
          break;
        case 'quantity':
          setQuantity(value);
          break;
        case 'pricePerUnit':
          setPricePerUnit(value);
          break;
        case 'pricePerWeight':
            setPricePerWeight(value);
            break;
        case 'tags':
          setTags(value);
          break;
        case 'dateAdded':
          setDateAdded(value);  
          break;
        case 'compareAtPrice':
          setCompareAtPrice(value);
           break;     
        case 'availability':
          setAvailability(value);
           break;
        case 'category':
          setCategory(value);
           break;
        case 'weightType':
        setWeightType(value);
          break;
          case 'remaining':
          setRemaining(value);
            break;
        case 'showQuantity':
          setShowQuantity(value);
            break;
            case 'custom':
          setCustom(value);
            break;
            case 'textInscribed':
          setTextInscribed(value);
            break;
            case 'stripelink':
          setStripelink(value);
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
         <Editor
            className='input form-control bg-transparent'
              required
              onChange={(e) => setDescription(e.target.getContent())}
              value={description}        
              apiKey='50aoyrxoc701ofyxj41a40y78q5y6ph1l3le8060iz5xcdx7'
              init={{
                plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'product.title', title: 'Product name' },
                  { value: 'product.price', title: 'product price' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              }}
              initialValue="Please input Important details about the product"
            />
      </div>  </div>

      <div className="add-product-input-group  mb-4">
        <label className='mt-5 fs-5 fw-bold mb-3'>Stripe Link:  </label><br/>
        <input
        className='input form-control bg-transparent bg-transparent'
          type="text"
          value={stripelink}
          onChange={(e) => setStripelink(e.target.value)}
          // placeholder=''
          required
        /> <br/></div>



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
            className='input form-control bg-transparent'
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
            className='input form-control bg-transparent'
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


        <div className="form-group ms-5 mb-5">
          <div className="form-group-price-each">
                <label>Compare at Price : <button disabled data-title='To display a markdown, enter a value higher than your price. Often shown with a strikethrough (e.g. $̶2̶5̶.0̶0̶).'> <i className="bi bi-question-circle-fill"></i> </button>  </label><br/>
                <input
                className='input form-control bg-transparent'
                  value={compareAtPrice}
                  type="number"
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                /></div>
        </div>      
        </div>  

      <div className="form-group form-group-price-each mb-3">
        <label  className='mt-3 fs-5 fw-bold mb-3'>Quantity : {pricePerUnit && ' ' +  'in Units'} {weightType &&  'In'} {weightType} </label><br/>
        <input
        className='input form-control bg-transparent'
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
        className='input form-control bg-transparent'
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
          className="text-light bg-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        > 
          <option  className="text-light bg-transparent" value="" selected disabled>Select a category</option>
          <option  className="text-light bg-transparent" value="family">family</option>
          <option  className="text-light bg-transparent" value="pets">pets</option>
          <option  className="text-light bg-transparent" value="lovers">lovers</option>
          
        </select>     
      </div>


    <div className="add-product-input-group">
    <div  className="form-group">
          <input
            type="text"
            value={inputValue}
        className='input form-control bg-transparent'
            onChange={handleInputChange}
          />
          <button type="button" className="btn-dark btn-sm" onClick={handleAddTag}>Add Tag</button>
        </div>
        <div className='d-flex mt-3 mt-3' style={{flexWrap:"wrap"}}>
          {tags.map((tag, index) => (
            <div key={index} className="add-produt-tag rounded-pill me-2 mb-3 bg-secondary btn-sm">
               <div onClick={() => handleRemoveTag(index)}> {tag} <i className="text-danger bi bi-x-lg"></i>
           </div>
            </div>
          ))}
        </div>
     
     
         <input
        type="hidden"
        id="stockNumber"
        value={generateStockNumber()} 
      />
      </div>
   

<button  type="button" className="mt-4 ms-auto btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" > Preview</button> 
   {adding && <p className="notification" >Adding {title}...</p>} {/* display a message while the painting is being added */}
      </form>
    </div>
   



    </div>









   {/* <!-- Modal --> */}
   {showModal && (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Preview Product</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body" >
        
          
        <div className="image-swiper-container add-product-image-preview-modal">
          {thumbsSwiper && ( <Swiper
              style={{
                '--swiper-navigation-color': 'rgb(250, 254, 36,0.5)',
                '--swiper-pagination-color': 'rgb(250, 254, 36,0.5)',
              }}
              loop={true}
              spaceBetween={0}
              navigation={true}
              scrollbar={{ draggable: true }}
              thumbs={{ swiper: thumbsSwiper }}
              onSwiper={setThumbsSwiper}
              slidesPerView={1}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Navigation, Scrollbar]}
              className="mySwiper2 add-product-image-preview-modal"
              >
                {img.map((image, index) => 
                <SwiperSlide key={image.id} >
                <img src={image} />
              </SwiperSlide>)} 
            </Swiper>  )}
            
          
          {/* <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              modules={[Navigation,Pagination, Scrollbar, A11y]} 
              navigation
              className="mySwiper"
              style={{
                '--swiper-navigation-color': 'rgb(250, 254, 36,0.2)',
                '--swiper-pagination-color': 'rgb(250, 254, 36,0.2)',
              }}
            >
              {img.map((image, index) => 
                <SwiperSlide key={image.id}>
                <img src={image} />
              </SwiperSlide>)} 
            </Swiper> */}
            
            </div>  
            
            

          
          <div className="add-product-preview-container">
                <h5>Product Title</h5>
            <p> {title} {category}</p>
                </div>


          <div className="add-product-preview-container">
                <h5>Product Description</h5>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>

          <div className="add-product-preview-container">
                <h5>Product Remaining in Stock</h5>
            <p> {quantity} {weightType}</p>
                </div>

            <div className="add-product-preview-container">
                <h5>Product Price</h5>
              <p>{pricePerUnit || pricePerWeight} {weightType && 'per'} {weightType}</p>
                </div>

                  <div className="add-product-preview-container" style={{flexWrap:"wrap", overflow:"hidden"}}>
                <h5>Product Tags</h5>
                <div className='d-flex mt-3 col-12 row' style={{flexWrap:"wrap"}}>
            {tags.map((tag, index) => (
              <div key={index} style={{width:"fit-content"}} className="add-produt-tag rounded-pill me-2 mb-2 btn-success btn btn-sm">
                {tag} 
              </div>
            ))}
          </div>
                </div>


        </div>
        <div className="modal-footer d-flex">
            <div className="me-auto">
                <h5>Stock Number</h5>
              <p>{stockNumber} 
          <button type="button" className='btn-info btn-sm btn ms-2 rounded-pill' onClick={handleRegenerateStockNumber}>Generate New Stock Number</button>
              </p> </div>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleSubmit} className='btn btn-primary' data-bs-dismiss="modal"  disabled={adding}> Add product</button> 
          </div>
      </div>
    </div>
    </div>)}




    
    
    </div>
  );
}

export default AddPainting;
