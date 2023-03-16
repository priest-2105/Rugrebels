import React from 'react';
import { useState } from 'react';
import './addPainting.css'
import { useHistory } from 'react-router-dom';
import useFetch from '../../../assets/hooks/usefetch';

const AddPainting = () => {
  const { preloader } = useFetch("http://localhost:8000/paintings");

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [adding, setAdding] = useState(false); // new state for tracking if the painting is being added
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const painting = { title, about, artist, date, img, price };
    setAdding(true); // set adding to true before sending the request
    fetch("http://localhost:8000/paintings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(painting),
    })
      .then(() => {
        console.log("new painting added");
        setAdding(false); // set adding to false when the request is complete
        history.push("/admindashboard");
      })
      .catch(() => {
        setAdding(false); // set adding to false if there was an error
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

  return (
    <div>
      {preloader && <div className="preloader">...Loading </div>}

      <h2>Add Painting</h2>

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
          type="number"
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

        <button disabled={adding}> Add painting</button> {/* disable the button while the painting is being added */}
        {adding && <p>Adding {title}...</p>} {/* display a message while the painting is being added */}
      </form>

      <p> {title}</p>
      <p> {artist}</p>
      <p> {about}</p>
      <p> {date}</p>
      <p>{price}</p>
      {img && <img src={img} alt="" />}
    </div>
  );
}

export default AddPainting;
