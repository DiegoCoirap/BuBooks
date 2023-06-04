/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";
import './AuthorProfile.css'

const AuthorUserProfile = () => {
  const { alias } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.post('http://192.168.1.133:8000/bubooks/author-profile', {
          alias
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAuthor(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthor();
  }, [alias]);

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderWithIcons />
      <h1>{author.username}</h1>
      <img src={author.image} alt="Author" />
      <p>{author.about_you}</p>
      <h2>Books</h2>
      <ul>
        {author.books.map(book => (
          <li key={book.id}>
              {book.title}
              img{book.book_cover}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorUserProfile;
*/

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";
import './AuthorProfile.css';
import bac from '../../../img/background.png'

const AuthorUserProfile = () => {
    const {alias} = useParams();
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        // Simulación de la llamada a la API para obtener los datos del autor
        const fetchAuthor = async () => {
            // Datos ficticios del autor
            const fakeAuthor = {
                username: 'John Doe',
                image: bac,
                about_you: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            };

            // Datos ficticios de los libros del autor
            const fakeBooks = [
                {id: 1, title: 'Book 1', book_cover: bac},
                {id: 2, title: 'Book 2', book_cover: bac},
                {id: 3, title: 'Book 3', book_cover: bac},
                {id: 3, title: 'Book 3', book_cover: bac},
                {id: 3, title: 'Book 3', book_cover: bac},
                {id: 3, title: 'Book 3', book_cover: bac},
                {id: 3, title: 'Book 3', book_cover: bac},
                {id: 3, title: 'Book 3', book_cover: bac},
                {id: 3, title: 'Book 3', book_cover: bac},

                // Resto de los libros ficticios
            ];

            // Simular el tiempo de espera de la llamada a la API
            await new Promise(resolve => setTimeout(resolve, 1000));

            setAuthor({
                ...fakeAuthor, books: fakeBooks
            });
        };

        fetchAuthor();
    }, [alias]);

    if (!author) {
        return <div>Loading...</div>;
    }

    return (<div className='authorProfile'>
        <HeaderWithIcons/>
        <div className="authorProfileMain">
            <div className="authorProfileLeft">
                <h1>{author.username}</h1>
                <img src={author.image} alt="Author"/>
                <p>{author.about_you}</p>
            </div>

            <div className="authorProfileRight">
                <h2>His books</h2>
                <ul>
                    {author.books.map(book => (<li key={book.id}>
                        <div className='authorProfileBook'>
                            <img src={book.book_cover} alt={book.title}/>
                        {book.title}
                        </div>

                    </li>))}
                </ul>
            </div>


        </div>
    </div>);
};

export default AuthorUserProfile;

