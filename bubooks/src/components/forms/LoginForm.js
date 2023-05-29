import React from 'react';

const UserProfile = ({ purchasedBooks, wishlist, onRemoveFromWishlist, onLogout }) => {
  return (
    <div>
      <h1>User Profile</h1>

      <h2>Purchased Books</h2>
      {purchasedBooks.length > 0 ? (
        <div>
          {purchasedBooks.map((book) => (
            <div key={book.id}>
              <img src={book.cover} alt={book.title} />
              <h3>{book.title}</h3>
              <button>Download</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No purchased books.</p>
      )}

      <h2>Wishlist</h2>
      {wishlist.length > 0 ? (
        <div>
          {wishlist.map((book) => (
            <div key={book.id}>
              <img src={book.cover} alt={book.title} />
              <h3>{book.title}</h3>
              <p>Price: {book.price}</p>
              <button onClick={() => onRemoveFromWishlist(book.id)}>Remove from Wishlist</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No wishlist items.</p>
      )}

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
