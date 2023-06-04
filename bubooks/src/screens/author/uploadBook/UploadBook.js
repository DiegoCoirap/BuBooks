import React, { useState } from 'react';
import axios from 'axios';

const CreateBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('');
  const [series, setSeries] = useState('');
  const [volumeNumber, setVolumeNumber] = useState(0);
  const [targetAudience, setTargetAudience] = useState('');
  const [matureContent, setMatureContent] = useState(false);
  const [price, setPrice] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();



    const bookData = {
      title,
      author,
      language,
      synopsis,
      category,
      series,
      volumeNumber,
      target_audience: targetAudience,
      mature_content: matureContent,
      price,
      book_cover: bookCover,
      rating,
    };

    try {
      const response = await axios.post('http://192.168.1.133:8000/bubooks/create-book', bookData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log('Book created successfully');
      } else {
        console.log('Error creating book:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <label htmlFor="language">Language:</label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      >
        <option value="">Select Language</option>
        <option value="ES">Spanish</option>
        <option value="EN">English</option>
        <option value="FR">French</option>
        <option value="DE">German</option>
        <option value="JA">Japanese</option>
        <option value="KO">Korean</option>
        <option value="RU">Russian</option>
        <option value="PT">Portuguese</option>
        <option value="ZH">Chinese</option>
        <option value="IT">Italian</option>
        <option value="HI">Hindi</option>
      </select>

      <label htmlFor="synopsis">Synopsis:</label>
      <textarea
        id="synopsis"
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
        required
      ></textarea>

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <label htmlFor="series">Series:</label>
      <input
        type="text"
        id="series"
        value={series}
        onChange={(e) => setSeries(e.target.value)}
        required
      />

      <label htmlFor="volumeNumber">Volume Number:</label>
      <input
        type="number"
        id="volumeNumber"
        value={volumeNumber}
        onChange={(e) => setVolumeNumber(e.target.value)}
        required
      />

      <label htmlFor="targetAudience">Target Audience:</label>
      <select
        id="targetAudience"
        value={targetAudience}
        onChange={(e) => setTargetAudience(e.target.value)}
        required
      >
        <option value="">Select Target Audience</option>
        <option value="0-5">Baby</option>
        <option value="5-10">Kid</option>
        <option value="10-15">Early Adolescence</option>
        <option value="15-20">Teenagers</option>
        <option value="20-25">Young Adult</option>
        <option value="25+">Adult</option>
      </select>

      <label htmlFor="matureContent">Mature Content:</label>
      <input
        type="checkbox"
        id="matureContent"
        checked={matureContent}
        onChange={(e) => setMatureContent(e.target.checked)}
      />

      <label htmlFor="price">Price:</label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label htmlFor="bookCover">Book Cover URL:</label>
      <input
        type="text"
        id="bookCover"
        value={bookCover}
        onChange={(e) => setBookCover(e.target.value)}
        required
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <button type="submit">Create Book</button>
    </form>
  );
};

export default CreateBookForm;
