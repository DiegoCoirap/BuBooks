import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";

const UserProfile = ({ onRemoveFromWishlist, onLogout }) => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {


    const fetchPurchasedBooks = async () => {
      try {
        const response = await axios.get('http://192.168.1.133:8000/bubooks/my-books', {
          headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPurchasedBooks(response.data);
      } catch (error) {
        console.error('Error fetching purchased books:', error);
      }
    };

    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://192.168.1.133:8000/bubooks/wish-list', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchPurchasedBooks();
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (purchasedBooks.length === 0 && wishlist.length === 0) {
      setMessage('No tienes libros comprados ni elementos en tu lista de deseos.');
    } else if (purchasedBooks.length === 0) {
      setMessage('No tienes libros comprados.');
    } else if (wishlist.length === 0) {
      setMessage('No tienes elementos en tu lista de deseos.');
    } else {
      setMessage('');
    }
  }, [purchasedBooks, wishlist]);

  const handleDownloadBook = (bookId) => {
    const downloadedBook = purchasedBooks.find((book) => book.id === bookId);
    if (downloadedBook) {
      // Realizar la lógica de descarga aquí
      console.log('Descargando libro:', downloadedBook.title);
    }
  };

  const handleRemoveFromWishlist = (bookId) => {
    onRemoveFromWishlist(bookId);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div>
      <HeaderWithIcons/>
      <h1>User Profile</h1>

      <button onClick={handleLogout}>Logout</button>

      <h2>Purchased Books</h2>
      {message === 'No tienes libros comprados.' && <p>{message}</p>}
      {purchasedBooks.length > 0 ? (
        purchasedBooks.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <button onClick={() => handleDownloadBook(book.id)}>Download</button>
          </div>
        ))
      ) : (
        message !== 'No tienes libros comprados.' && <p>{message}</p>
      )}

      <h2>Wishlist</h2>
      {message === 'No tienes elementos en tu lista de deseos.' && <p>{message}</p>}
      {wishlist.length > 0 ? (
        wishlist.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <button onClick={() => handleRemoveFromWishlist(book.id)}>Remove</button>
          </div>
        ))
      ) : (
        message !== 'No tienes elementos en tu lista de deseos.' && <p>{message}</p>
      )}
    </div>
  );
};

export default UserProfile;
