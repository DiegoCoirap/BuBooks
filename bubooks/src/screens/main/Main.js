import React, { useState } from 'react';
import axios from 'axios';
import HeaderWithIcons from '../../components/header/HeatherWithIcons';
import SearchingList from '../../components/searching/searchingList/SearchingList';
import SearchingBar from '../../components/searching/searchingBar/SearchingBar';
import Tags from '../../components/searching/tags/Tags';
import BooksWithStars from '../../components/books/BooksWithStars';
import './Main.css'

const Main = () => {



  return (
    <div className='main'>
      <HeaderWithIcons />
      <div className='mainBody'>
        <SearchingList />
          <BooksWithStars className='booksMain' />
      </div>
    </div>
  );
};

export default Main;
