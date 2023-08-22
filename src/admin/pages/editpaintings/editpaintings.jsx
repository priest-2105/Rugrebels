import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './editpaintings.css';
import useFetch from '../../../assets/hooks/useFetch';

const Editpaintings = () => {
  const { id } = useParams();
  const { data: painting, error, preloader } = useFetch(`https://rugrebelsdb.onrender.com/paintings/${id}`);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (painting) {
      setTitle(painting.title);
      setAbout(painting.about);
      setArtist(painting.artist);
      setDate(painting.date);
      setPrice(painting.price);
      setImg(painting.img);
      setTags(painting.tags);
    }
  }, [painting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPainting = { title, about, artist, date, img, tags };
    setSaving(true);
    fetch(`https://rugrebelsdb.onrender.com/paintings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPainting),
    })
      .then(() => {
        console.log("painting updated");
        setSaving(false);
        history.push(`/paintings/${id}`);
      })
      .catch(() => {
        setSaving(false);
      });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
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

  if (preloader) {
    return <div className="preloader">...Loading </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);}
    

  return (
    <div>
      <h2>Edit Painting</h2>

      <form className='edit-painting-form' onSubmit={handleSubmit}>
     
      <img src={painting.img} alt=""/>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
        />

     
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
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

      <label>Price : </label>
        <input
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Date : </label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
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


        <button disabled={saving}> Save painting</button>
        {saving && <p className="notification" >Saving {title}...</p>}

        {/* <!-- Delete trigger modal --> */}
        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
        <button className='btn btn-danger' onClick={handleDelete}>Delete painting</button>
      </div>
    </div>
  </div>
</div>

    
    
    
    
    
    
    
    
    </div>


  )
};

export default Editpaintings;
