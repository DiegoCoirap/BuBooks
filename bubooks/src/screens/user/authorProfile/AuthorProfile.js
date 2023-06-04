import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";


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
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorUserProfile;
