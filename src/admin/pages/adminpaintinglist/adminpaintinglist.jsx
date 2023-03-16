import React from 'react';
import './adminpaintinglist.css'
import { Link } from 'react-router-dom';




const Adminpaintinglist = (props) => {
  


 const paintings = props.paintinglistprop;
    
    
  
    return (
        <div>
            <h2> Admin painting List</h2>


   
      {paintings.map ((painting) => (
        <div className="painting-preview" key={painting.id}>
        <Link to={`/Adminpaintingpreview/${painting.id}`}>
          <img src={painting.img} alt=""/>
          {/* <img src={painting.imageUrl} alt={painting.title} /> */}
         <h2>{ painting.title}</h2>
         <h4>${painting.price}</h4>
         <p> { painting.about } </p>
         <span>By { painting.artist }</span>
         <h5>{ painting.date }</h5>
         <Link to={`/editpaintings/${painting.id}`}>  Edit</Link>
         </Link>
        </div>
      ))}         

        </div>


);
}

export default Adminpaintinglist;
