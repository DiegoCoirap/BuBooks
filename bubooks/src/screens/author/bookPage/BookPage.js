import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../../Api';
import './BookPage.css';
import axios from 'axios';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";

const BookPageAuthor = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({ comments: [] });
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);


  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await Api.getBookById(id);
        if (response) {
          setBookData(response);
          showComments(); // Llamada automática a la función showComments después de obtener los datos del libro
        } else {
          console.error('No se obtuvo ninguna respuesta del servidor');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookData();
  }, [id]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const showComments = async () => {
    if (!bookData || !bookData.title) {
      console.error('Book data is missing');
      return;
    }

    try {
      const response = await axios.post(`http://192.168.1.133:8000/bubooks/comments`, {
        book: bookData.title
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.data && Array.isArray(response.data)) {
        const comments = response.data.map((comment) => ({
          title: comment.title,
          comment: comment.comment,
          rating: comment.rating,
          user: comment.user.toString(),
        }));
        setBookData((prevData) => ({
          ...prevData,
          comments: comments,
        }));
      } else {
        console.error('No se obtuvo ninguna respuesta del servidor');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!bookData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bookPage">
      <HeaderWithIcons/>
      <h2>{bookData.title}</h2>
      <p>Author: {bookData.author}</p>
      <p>Price: {bookData.price}</p>
      <p>Description: {bookData.synopsis}</p>
      <p>Rating: {bookData.rating}</p>
      <p>{bookData.language}</p>
      <p>{bookData.target_audience}</p>

      <div className="commentSection">
        <h3>Comments</h3>

        <div className="commentList">
          {bookData.comments && bookData.comments.map((comment, index) => (
            <div className="comment" key={index}>
              <h4>Comment by {comment.user}</h4>
              <p>Title: {comment.title}</p>
              <p>Comment: {comment.comment}</p>
              <p>Rating: {comment.rating}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BookPageAuthor;
