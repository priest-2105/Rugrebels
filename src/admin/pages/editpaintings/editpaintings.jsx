import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './editpaintings.css';
import useFetch from '../../../assets/hooks/useFetch';

const Editpaintings = () => {
  const { id } = useParams();
  const { data: painting, error, preloader } = useFetch(`http://localhost:8000/paintings/${id}`);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
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
    }
  }, [painting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPainting = { title, about, artist, date, img };
    setSaving(true);
    fetch(`http://localhost:8000/paintings/${id}`, {
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

  if (preloader) {
    return <div className="preloader">...Loading </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Painting</h2>

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

        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
        />

        <button disabled={saving}> Save painting</button>
        {saving && <p>Saving {title}...</p>}

      </form>

      <button onClick={handleDelete}>Delete painting</button>

    </div>

  )
};

export default Editpaintings;
