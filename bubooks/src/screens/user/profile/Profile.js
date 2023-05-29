import React, { useState } from 'react';

const UserProfile = ({ purchasedBooks, wishlist, onRemoveFromWishlist, onLogout }) => {
  const [downloadedBooks, setDownloadedBooks] = useState([]);

  const handleDownloadBook = (bookId) => {
    // Simulación de la descarga del libro
    const downloadedBook = purchasedBooks.find((book) => book.id === bookId);
    if (downloadedBook) {
      setDownloadedBooks([...downloadedBooks, downloadedBook]);
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
      <h1>User Profile</h1>

      <h2>Purchased Books</h2>
      {purchasedBooks.map((book) => (
        <div key={book.id}>
          <img src={book.cover} alt="Book Cover" />
          <h3>{book.title}</h3>
          <button onClick={() => handleDownloadBook(book.id)}>Download Again</button>
        </div>
      ))}

      <h2>Wishlist</h2>
      {wishlist.map((book) => (
        <div key={book.id}>
          <img src={book.cover} alt="Book Cover" />
          <h3>{book.title}</h3>
          <p>Price: {book.price}</p>
          <button onClick={() => handleRemoveFromWishlist(book.id)}>Remove from Wishlist</button>
        </div>
      ))}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
