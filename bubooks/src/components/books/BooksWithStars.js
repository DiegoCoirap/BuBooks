import React, { useEffect, useState } from 'react';
import './BooksWithStars.css';
import Background from '../../img/background.png';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/system';

const BooksWithStars = () => {
  const [bookData, setBookData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
   /* const fetchBookData = async () => {
      try {
        const response = await api.getBooks();
        if (response.status === 200 && response.data) {
          setBookData(response.data);
          setFilteredBookData(response.data);
        } else {
          throw new Error("Error fetching book data.");
        }
      } catch (error) {
        console.error(error);
      }
    };*/

    const fetchBookData = async () => {
      try {
        // Datos falsos de ejemplo
        const fakeData = [
          {
            id: 1,
            title: 'Book 1',
            author: 'Author 1',
            price: 9.99,
            rating: 4.5,
            book_cover: 'path/to/book1.jpg',
          },
          {
            id: 2,
            title: 'Book 2',
            author: 'Author 2',
            price: 12.99,
            rating: 3.8,
            book_cover: 'path/to/book2.jpg',
          },
        ];

        // Simular una pequeña demora de la solicitud
         await new Promise((resolve) => setTimeout(resolve, 1000));

        setBookData(fakeData);
        setFilteredBooks(fakeData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookData();
  }, []);

  const addToWishlist = (bookId) => {
    console.log(`Book added to wishlist: ${bookId}`);
  };

  const addToCart = (bookId) => {
    console.log(`Book added to cart: ${bookId}`);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filtered = bookData.filter((book) => {
      const bookTitle = book.title.toLowerCase();
      const bookAuthor = book.author.toLowerCase();
      const search = searchTerm.toLowerCase();
      return bookTitle.includes(search) || bookAuthor.includes(search);
    });

    setFilteredBooks(filtered);
  };

  const navigateToBookPage = (bookId) => {
    window.location.href = `/bookpage/${bookId}`;
  };

  return (
    <div>
      <div>
        <img src={Background} alt="Background" />
      </div>
      {filteredBooks.map((book) => (
        <div key={book.id} onClick={() => navigateToBookPage(book.id)}>
          <img src={book.book_cover} alt="Book Cover" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.price}</p>
          <Box component="fieldset" borderColor="transparent">
            <Rating name="rating" value={book.rating} precision={0.5} readOnly />
          </Box>
          <button onClick={() => addToWishlist(book.id)}>Add to Wishlist</button>
          <button onClick={() => addToCart(book.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default BooksWithStars;
