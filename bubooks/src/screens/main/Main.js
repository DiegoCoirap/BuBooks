import React, { useState } from 'react';
import axios from 'axios';
import HeaderWithIcons from '../../components/header/HeatherWithIcons';
import SearchingList from '../../components/searching/searchingList/SearchingList';
import SearchingBar from '../../components/searching/searchingBar/SearchingBar';
import Tags from '../../components/searching/tags/Tags';
import BooksWithStars from '../../components/books/BooksWithStars';

const Main = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`API_URL?q=${searchTerm}`);
      let filteredResults = response.data;

      if (selectedTag) {
        filteredResults = filteredResults.filter((book) =>
          book.tags.includes(selectedTag)
        );
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <div className='main'>
      <HeaderWithIcons />
      <div className='mainBody'>
        <SearchingList onTagSelect={handleTagSelect} />
        <div className='rightMain'>
          <div>
            <SearchingBar onSearch={handleSearch} />
          </div>
          <Tags />
          <h2>Month best sellers</h2>
          <BooksWithStars books={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default Main;
