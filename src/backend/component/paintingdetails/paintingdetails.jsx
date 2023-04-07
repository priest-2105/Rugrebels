import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../../../assets/hooks/usefetch';
import './paintingdetails.css'
      import { useHistory } from 'react-router-dom';


    const Paintingdetails = () => {
    




    const history = useHistory("/shop"); // add this line to use useHistory hook
    
    const { id } = useParams();

    const { data:painting, preloader, error } = useFetch('http://localhost:8000/paintings/' + id); 

    
    const [isAdded, setIsAdded] = useState(false);

 
  const handleAddToCart = (painting) => {
  fetch('http://localhost:8000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(painting)
  })
    .then((response) => response.json())
    .then((data) => {
      setIsAdded(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

  

    const prevbutton = () => { 
          history.push("/shop"); 
    };
  
      

    return (
       
       <div className='painting-details'>
        <button className='prevbutton' onClick={prevbutton}><i className="bi bi-arrow-left-square-fill"></i></button> 
     { error && <div>{ error }</div>}

    {/* preloader  */}
     { preloader && <div  className='preloader'>...Loading </div> }                                                                     

 
      { painting && (
              <div className='painting-detail-container'>
                <div className="backlinks">
                 <Link to='/'>Home</Link>
                  /<Link to='/shop'>Shop</Link>  
                   /<Link className='disabled' to='/'>{painting.title}</Link>
                </div>
              <div className='painting-detail'>
           <img src={painting.img} alt="painting" />
           <div className="product-description ms-4">
          <h2>{painting.title}</h2>
          <h4>${painting.price}</h4>
          <span>Artist:{painting.artist}</span>
            <h5>{painting.date}</h5>
   
            <div className="buttons">
            <div  className="quantity">
              <span>Qauntity</span><select className='ms-2 pe-4 ps-4 pt-2 pb-2' name="quantityselect" id="quantityselect">  
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option></select>
              
            
            </div>
            <button onClick={() => handleAddToCart(painting)}>Add to Cart</button>
            <button>Buy Now</button>
            </div> 

          <div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
       Description
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div className="accordion-body about-product">
      <p>{painting.about}</p>
          </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
       Return Policy
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
      <div className="accordion-body"> 
    I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are
    dissatisfied with their purchase. Having a straightforward refund or exchange policy 
    is a great way to build trust and reassure your customers that they can buy with confidence.
           </div>
    </div>
  </div> 
</div>

          </div></div> 
         
      {isAdded && (
        <div className="popup">
          Item added to cart!
          <button onClick={() => setIsAdded(false)}>Close</button>
        </div>)}
      
           </div>
      )}


    
        
            


        </div>
    );
}

export default Paintingdetails;
