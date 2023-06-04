import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../../Api';
import './BookPage.css';
import axios from 'axios';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";

const BookPage = () => {
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
        console.log(response.title)
        bookData.title = response.title
        if (response.title) {
          showComments(); // Call showComments only if the book data has a title
        }
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

  const handleAddComment = async () => {
    try {
      await Api.createComment({
        title: 'New Comment',
        comment: comment,
        rating: rating,
        book: bookData.title,
      });
      const response = await Api.getBookById(id);
      if (response) {
        setBookData(response);
      } else {
        console.error('No se obtuvo ninguna respuesta del servidor');
      }
      setComment('');
      setRating(5);
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
        {/* Botón eliminado ya que los comentarios se cargarán automáticamente */}
        {/* <button onClick={showComments}>Show Comments</button> */}

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

        <div className="addComment">
          <h4>Add a Comment</h4>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Enter your comment..."
          ></textarea>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default BookPage;