import './SearchingList.css'
import BASE_URL from '../../../environment'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Language} from "@mui/icons-material";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(BASE_URL + '/bubooks/categories');
      setCategories(response.data);
    };
    fetchData();
  }, []);

  return categories;
};

const Languages = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(BASE_URL + '/bubooks/language-options');
      setLanguages(response.data);
    };
    fetchData();
  }, []);

  return languages;
};


function SearchingList() {
  const categories = Categories();

  const categoryList = categories.map((category) => (
    <li key={category.id}>{category.category}</li>
  ));

  const languages = Languages();

  const languageList  = languages.map((language) => (
      <li key={language.languageCode}>{language.languageLabel}</li>
  ))

  return (
    <div className='searchingList'>
      <h2 className='listTitle'>Categories</h2>
      <ul className='list'>{categoryList}</ul>
      <h2 className='listTitle'>Price</h2>
      <ul className='list'>
          <li>From 0 to 5€</li>
          <li>From 5 to 10€</li>
          <li>From 10 to 20€</li>
          <li>More than 20€</li>
      </ul>
      <h2 className='listTitle'>Languages</h2>
        <ul className='list'>{languageList}</ul>
    </div>
  );
}


export default SearchingList;
