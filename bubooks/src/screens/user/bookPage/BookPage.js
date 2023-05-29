import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const BookPage = () => {
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ title: '', rating: 0, comment: '' });
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // Datos falsos de ejemplo
        const fakeBook = {
          id: 1,
          title: 'Book Title',
          author: 'Author Name',
          price: 9.99,
          rating: 4.5,
          book_cover: 'path/to/book.jpg',
          language: 'English',
          category: 'Fiction',
          series: 'Book Series',
          volumeNumber: 1,
          targetAudience: 'Young Adults',
          matureContent: false,
          synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam sem ac nunc fringilla, at hendrerit nulla pharetra.'
        };
        const fakeComments = [
          { id: 1, title: 'Comment 1', rating: 4, comment: 'Comment text 1' },
          { id: 2, title: 'Comment 2', rating: 3, comment: 'Comment text 2' },
        ];

        // Simular una pequeña demora de la solicitud
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setBook(fakeBook);
        setComments(fakeComments);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value
    });
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      if (newComment.title.trim() === '' || newComment.comment.trim() === '') {
        console.error('Title and comment cannot be empty');
        return;
      }

      // Simular la adición de un comentario
      const newCommentData = {
        id: comments.length + 1,
        title: newComment.title,
        rating: newComment.rating,
        comment: newComment.comment
      };

      setComments([...comments, newCommentData]);
      setNewComment({ title: '', rating: 0, comment: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const addToWishlist = () => {
    if (!wishlist.includes(book.id)) {
      setWishlist([...wishlist, book.id]);
      console.log('Book added to wishlist:', book.title);
    } else {
      console.log('Book is already in the wishlist:', book.title);
    }
  };

  const addToCart = () => {
    if (!cart.includes(book.id)) {
      setCart([...cart, book.id]);
      console.log('Book added to cart:', book.title);
    } else {
      console.log('Book is already in the cart:', book.title);
    }
  };

  if (!book) {
    return <div>Loading...</div>; // Mostrar "Loading..." mientras se obtienen los datos del libro
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.book_cover} alt="foto"/>
      <p>{book.author}</p>
      <p>{book.price}€</p>
      <p>Language: {book.language}</p>
      <p>Category: {book.category}</p>
      {book.series && <p>Series: {book.series}</p>}
      {book.volumeNumber && <p>Volume: {book.volumeNumber}</p>}
      <p>Target Audience: {book.targetAudience}</p>
      <p>Mature Content: {book.matureContent ? 'Yes' : 'No'}</p>
      <p>Synopsis: {book.synopsis}</p>


      <Box component="fieldset" borderColor="transparent">
        <Rating name="book-rating" value={book.rating} precision={0.5} readOnly />
      </Box>

      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.title}</h3>
          <Box component="fieldset" borderColor="transparent">
            <Rating name={`comment-rating-${comment.id}`} value={comment.rating} precision={0.5} readOnly />
          </Box>
          <p>{comment.comment}</p>
        </div>
      ))}

      <h2>Add a Comment</h2>
      <form onSubmit={submitComment}>
        <div>
          <label htmlFor="commentTitle">Title:</label>
          <input
            id="commentTitle"
            name="title"
            type="text"
            value={newComment.title}
            onChange={handleCommentChange}
          />
        </div>
        <div>
          <label htmlFor="commentRating">Rating:</label>
          <Rating
            id="commentRating"
            name="rating"
            min={1}
            max={5}
            value={newComment.rating}
            precision={0.5}
            onChange={(event, value) => {
              setNewComment({ ...newComment, rating: value });
            }}
          />
        </div>
        <div>
          <label htmlFor="commentText">Comment:</label>
          <textarea
            id="commentText"
            name="comment"
            value={newComment.comment}
            onChange={handleCommentChange}
          />
        </div>
        <button type="submit">Submit Comment</button>
      </form>

      <button onClick={addToWishlist}>Add to Wishlist</button>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default BookPage;
