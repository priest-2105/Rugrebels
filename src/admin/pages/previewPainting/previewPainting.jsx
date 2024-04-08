import './previewPainting.css'
import  { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { doc, updateDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../../backend/config/fire';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
// import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';




const Previewproduct = () => {



    const { id } = useParams();
    // const { data: product, error, preloader } 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [disabling, setDisabling] = useState(false);
    const [enabling, setEnabling] = useState(false);  
    const [img, setImg] = useState([]);
    const [stripelink, setStripelink] = useState("")
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState([]);
    const [saving, setSaving] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState([]); 
    const [moreImageloadingMessages, setMoreImageLoadingMessages] = useState([]); 
    const [quantityDisplay, setQuantityDisplay] = useState('off');
    const history = useNavigate();
    const [dateAdded, setDateAdded] = useState(new Date().toISOString().slice(0, 10));
    const [pricePerUnit, setPricePerUnit] = useState(0);
    const [pricePerWeight, setPricePerWeight] = useState(0);
    const [compareAtPrice, setCompareAtPrice] = useState(0);
    const [priceType, setPriceType] = useState('weight');
    const [weightType, setWeightType] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [availability, setAvailability] = useState('true');
    const [custom, setCustom] = useState(false);
    const [textInscribed, setTextInscribed] = useState(false);
    const [showQuantity, setShowQuantity] = useState(false);




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
          toast.success('New StockNumber Generated');
          setStockNumber(generateStockNumber());
        }; 


  
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
                setWeightType(productData.weightType); 
                setQuantity(productData.quantity);
                setAvailability(productData.availability);
                setStockNumber(productData.stockNumber);
                setShowQuantity(productData.showQuantity); 
                setQuantityDisplay(productData.quantityDisplay);
                setImg(productData.img);
                setTags(productData.tags);
                setCategory(productData.category);
                setCustom(productData.custom)
                setTextInscribed(productData.textInscribed)               
                setProductDetails(productData);
                setStripelink(productData.stripelink);
              }
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
        
          getproductData();
        }, [id]);


        const handleEnable = async () => {
          try {
            setEnabling(true);
        
            // Assuming you have a db reference
            const productRef = doc(db, 'products', id);
        
            // Update the status to "active"
            await updateDoc(productRef, { status: 'Active' });
        
            // Update the local state
            setProductDetails((prevDetails) => ({
              ...prevDetails,
              status: 'Active',
            }));
            toast.success('Product enabled');
          } catch (error) {
            toast.error('Error enabling product');
            console.error('Error enabling product:', error.message);
          } finally {
            setEnabling(false); // Reset the loading state, regardless of success or failure
          }
        };
        
        const handleDisable = async () => {
          try {
            setDisabling(true);
            // Assuming you have a db reference
            const productRef = doc(db, 'products', id);
        
            // Update the status to "Inactive"
            await updateDoc(productRef, { status: 'Inactive' });
        
            // Update the local state
            setProductDetails((prevDetails) => ({
              ...prevDetails,
              status: 'Inactive',
            }));
            toast.success('Product Disabled');
          } catch (error) {
            toast.error('Error disabling product');
            console.error('Error disabling product:', error.message);
          } finally {
            setDisabling(false); // Reset the loading state, regardless of success or failure
          }
        };
        


        const handleDelete = async () => {
          try {
            setDisabling(true);
            const docRef = doc(db, 'products', id);
            await deleteDoc(docRef);
            toast.success('Product deleted successfully');
            console.log('Product deleted successfully');
            history('/admin/products'); 
          } catch (error) {
            toast.error('Product deleted successfully');
            console.log('Product deleted successfully');
          }
        };

        const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedproduct = { 
          title: title || '',
          description: description || '',
          pricePerUnit: pricePerUnit || '',
          pricePerWeight: pricePerWeight || '',
          priceType: priceType || '',
          weightType: weightType || '', 
          availability: availability || '',
          compareAtPrice: compareAtPrice || '',
          img: img || [],
          tags: tags || [],
          category: category || '',
          quantity: quantity || '',
          quantityDisplay: quantityDisplay || '',
          custom: custom || '',
          textInscribed: textInscribed || '',
          stripelink: stripelink || '',
          };
        setSaving(true);

        try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, updatedproduct);

        toast.success('Product saved');
        console.log('product updated in Firestore');
        setSaving(false);
        // history(`/admin/products/${id}`);
        } catch (error) {
        toast.error('Error saving the product');
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
            toast('Uploading');
        
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
            toast.success('Uploading');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        }

        setMoreImageLoadingMessages([]); 
        setImg(prevImages => [...prevImages, ...newImages]);
        };


        const handleClearImages = () => {
        setImg([]);
        toast.success('Images Cleared');   
      }

        const handleRemoveImage = (index) => {
        const newImages = [...img];
        newImages.splice(index, 1);
        setImg(newImages);
        toast.success('Image Removed');
        };

        const handleTagChange = (e) => {
        const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
        setTags(selectedTags);
        };

  

    return (
        <div>

            




    <div>
        <Link style={{display:"flex", width:"fit-content",alignItems:"center"}} to="/tfghjkdyfrgehrtkmebvgc4k6lm54j3hgvfc46kl54m3jh2gfd3gh4jk5l6k5j4hb3gf2dfg3hj4k5l/admin/products"> <i className="bi mb-2 fs-1 bi-caret-left-fill"></i><h3 style={{color:"aliceblue"}}>Preview Product </h3></Link> 

        <div className="admin-add-product-container text-light bg-transparent">


      <div className="card bg-transparent p-4 pb-4">
    
       <h2>Preview product</h2>
      {productDetails &&
    <div className="d-flex mt-5">
          <h5>{productDetails.title}</h5>
                
          {productDetails.status === 'Active' && (
        <div className='ms-auto'>
          {!disabling && (
            <button className='ms-auto btn-warning  btm-sm' onClick={handleDisable} disabled={disabling}>
              {disabling ? 'Disabling' : 'Disable'}
            </button>
          )}
        </div>
      )}

      {productDetails.status === 'Inactive' && (
        <div className='ms-auto'>
          {!enabling && (
            <button className='ms-auto btn-success btm-sm' onClick={handleEnable} disabled={enabling}>
              {enabling ? 'Enabling' : 'Enable'}
            </button>
          )}
        </div>
      )}</div>}
     
      <ul className="nav mt-2 nav-tabs" id="myTab" role="tablist">
  
  <li className="nav-item active" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Product Stats</button>
  </li> 
   <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Edit</button>
  </li>
      </ul>
    <div className="tab-content" id="myTabContent">
    
    
  
   
      {productDetails &&<div className="tab-pane pt-5 fade active show" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">


      <div className="col-12 d-flex mb-3">

        <div className="col-4 me-4 fw-bold">Stock Number :</div>

            <div className="text-start">{productDetails.stockNumber}</div>

            </div>



       <div className="col-12 d-flex mb-3">

      <div className="col-4 me-4 fw-bold">Product Category :</div>

      <div className="text-start">{productDetails.category}</div>

      </div>


      <div className="col-12 d-flex mb-3">

      <div className="col-4 me-4 fw-bold">Custom ? :</div>

      <div className="text-start">
        {productDetails.custom ? "Yes" : "No"}
      </div>

      </div>



      <div className="col-12 d-flex mb-3">

      <div className="col-4 me-4 fw-bold">Text Inscribed :</div>

      <div className="text-start">
  {productDetails.textInscribed ? "Yes" : "No"}
</div>

      </div>



          
      {pricePerUnit  >= 1 &&<div className="col-12 d-flex mb-3">

      <div className="col-4 me-4 fw-bold">Unit Price :</div>

      <div className="text-start">${productDetails.pricePerUnit}</div>

      </div>}  



      {pricePerWeight >= 1  && <div className="col-12 d-flex mb-3">

      <div className="col-4 me-4 fw-bold">Price per Weight :</div>

      <div className="text-start">${productDetails.pricePerWeight} Per {weightType}</div>

      </div>}  








          <div className="col-12 d-flex mb-3">

        <div className="col-4 me-4 fw-bold">
          {pricePerUnit && 'Unit Sold'}
          {pricePerWeight && 'Weight Sold'}
        </div>

        <div className="text-start"> {(productDetails.amountsold ) !== undefined
        ? (Number.isInteger(productDetails.amountsold ) ? (productDetails.amountsold ) : (productDetails.amountsold).toFixed(2))
        : 'N/A' // or any default value you prefer when amountsold is undefined 
        
      } {productDetails.weightType}</div>

        </div>



      <div className="col-12 d-flex mb-3">

      <div className="col-4 me-4 fw-bold">Revenue :</div>

      <div className="text-start"> ${(productDetails.amountsold * (productDetails.pricePerWeight || productDetails.pricePerUnit )) !== undefined
      ? (Number.isInteger(productDetails.amountsold * (productDetails.pricePerWeight || productDetails.pricePerUnit )) ? (productDetails.amountsold * (productDetails.pricePerWeight || productDetails.pricePerUnit )) : (productDetails.amountsold * (productDetails.pricePerWeight || productDetails.pricePerUnit )).toFixed(2))
      : 'N/A' // or any default value you prefer when amountsold is undefined
      }</div>

      </div>


 
      <div className="col-12 d-flex mb-3">

          <div className="col-4 me-4 fw-bold">
          {pricePerUnit && 'Unit Remaining'}
          {pricePerWeight && 'Weight Remaining'}
            :</div>

          <div className="text-start">{productDetails.remaining} {productDetails.weightType}</div>

          </div>



  
                <div className="col-12 d-flex mb-3">

          <div className="col-4 me-4 fw-bold">Date Added :</div>

          <div className="text-start">{productDetails.dateAdded}</div>

          </div>
        
        </div>}
  
   
   
      <div className="tab-pane pt-5 fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">

      <form className='edit-product-form' onSubmit={handleSubmit}>
                  <div className="add-product-input-group upload-image-input-group">  
          <label htmlFor=""></label>
          <label> Upload Media <button  disabled data-title='Your Cover image will be the first and main picture of your product'> <i className="bi bi-question-circle-fill"></i> </button></label> <br/>
        
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

          <div className="form-group mb-4">
        <label className='mt-5 fs-5 fw-bold mb-3'> Product Title:  </label><br/>
        <input
        className='input form-control'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Short sleeve shirt'
        /> <br/>

        <div className="form-group mb-4">
        <label className='mt-5 fs-5 fw-bold mb-3'>Stripe Link:  </label><br/>
        <input
        className='input form-control'
          type="text"
          value={stripelink}
          onChange={(e) => setStripelink(e.target.value)}
          placeholder='Short sleeve shirt'
          required
        /> <br/></div>

      
        


        <div className="form-group-price-each">
         <label className='mt-5 fs-5 fw-bold mb-3'> Product Description: <button disabled data-title='Drag textarea to increase height, if you have a longer product description'> <i className="bi bi-question-circle-fill"></i> </button>  </label><br/>
         {/* <Editor
            className='input form-control'
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
            /> */}
      </div>  </div>

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




      <div className="form-group form-group-price-each mb-3">
        <label  className='mt-3 fs-5 fw-bold mb-3'>Product Category : </label><br/>
                  <select
          name="productcategory"
          id="productcategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        > 
          <option value="" selected disabled>Select a category</option>
          <option value="family">family</option>
          <option value="pets">pets</option>
          <option value="lovers">lovers</option>
          
        </select>     
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
       <div  className="form-group form-group-price-each mb-3">
        <label htmlFor="">Stock Number <button disabled data-title='The stock Number is Auto-generated you can regenerate a new stock number'> <i className="bi bi-question-circle-fill"></i> </button> </label> 
         <br/>
         <input type="text"
        id="stockNumber"
        className='border-0'
        readOnly
        value={generateStockNumber()} 
      />
       {/* <button type="button" className='bg-secondary btn-sm btn ms-2 rounded-pill' onClick={handleRegenerateStockNumber}>Generate New Stock Number</button> */}
      
   </div>
   

              <button className="btn mt-3 btn-primary" disabled={saving}> Save product</button>
              {saving && <p className="notification" >Saving {title}...</p>}

              {/* <!-- Delete trigger modal --> */}
              <button type="button" className="btn mt-3 ms-4 bg-danger btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Delete
            </button>

      </form>

      </div>
   

    </div>
      </div>  

     

    
    
    



   

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
            <button onClick={handleDelete} className='btn btn-danger bg-danger' data-bs-dismiss="modal">Delete product</button>
          </div>
        </div>
      </div>
    </div>

    
    
    
    
    
    </div>
  

  
  
  </div>  



        </div>
    );
}

export default Previewproduct;
