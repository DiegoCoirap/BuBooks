import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditAuthor = () => {
  const navigate = useNavigate();
  const [alias, setAlias] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(localStorage.token);

    const authorData = {
      alias,
      about_you: aboutYou,
      image,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://192.168.1.133:8000/bubooks/create-author', authorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Author profile has been successfully created');
        // Redirigir al perfil del autor con el alias como parámetro de la URL
        navigate(`/authorProfile/${alias}`);
      } else {
        console.log('Error creating author profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating author profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="alias">Alias:</label>
      <input
        type="text"
        id="alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        required
      />

      <label htmlFor="aboutYou">About You:</label>
      <textarea
        id="aboutYou"
        value={aboutYou}
        onChange={(e) => setAboutYou(e.target.value)}
        required
      ></textarea>

      <label htmlFor="image">Image URL:</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />

      <button type="submit">Edit Profile</button>
    </form>
  );
};

export default EditAuthor;
