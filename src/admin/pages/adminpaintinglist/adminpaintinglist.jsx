import React from 'react';
import './adminpaintinglist.css'
import { Link } from 'react-router-dom';




const Adminpaintinglist = (props) => {
  


 const paintings = props.paintinglistprop;
    
    
  const handleDelete = () => {
    fetch(`http://localhost:8000/paintings/${id}`, {
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
  
    return (
        <div>
            <h2> Admin painting List</h2>


   
      {paintings.map ((painting) => (
  <div className="painting-preview-container"> 
        <div className="painting-preview rounded" key={painting.id}>
        <Link to={`/Adminpaintingpreview/${painting.id}`}>
          <img src={painting.img} alt=""/>
          {/* <img src={painting.imageUrl} alt={painting.title} /> */}
         <h2>{ painting.title}</h2>
         <h4>${painting.price}</h4>
         <p> { painting.about } </p>
         <span>By { painting.artist }</span>
         <h5>{ painting.date }</h5>
         <Link className='edit-button' to={`/editpaintings/${painting.id}`}>  Edit<i class="bi ms-2 bi-pencil-fill"></i></Link>
         <Link className="delete-button bg-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"> Delete <i class="bi bi-trash3-fill"></i></Link>
         </Link>
        </div>  
        
        {/* <!--Delete Modal Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog border-danger">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete { painting.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      Are You Sure You Want To Delete { painting.title}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  class="btn btn-danger" onClick={handleDelete}>Delete painting</button>
      </div>
    </div>
  </div>
</div>
        
        </div>
      ))}         


  



        </div>


);
}

export default Adminpaintinglist;
