import React from 'react';
import axios from 'axios';

const ShoppingCart = ({ books, onAddToWishlist, onRemoveFromCart }) => {
  const handleAddToWishlist = async (bookId) => {
    try {
      // Realizar solicitud POST a la API para agregar el libro al wishlist
      await axios.post('api/wishlist', { bookId });
      onAddToWishlist(bookId);
    } catch (error) {
      // Manejar el error de la solicitud
      console.error('Error al agregar el libro al wishlist:', error);
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      // Realizar solicitud DELETE a la API para eliminar el libro del carrito
      await axios.delete(`api/cart/${bookId}`);
      onRemoveFromCart(bookId);
    } catch (error) {
      // Manejar el error de la solicitud
      console.error('Error al eliminar el libro del carrito:', error);
    }
  };

  // Datos falsos para mostrar en el carrito
  const fakeBooks = [
    { id: 1, title: 'Book 1', price: 9.99 },
    { id: 2, title: 'Book 2', price: 14.99 },
    { id: 3, title: 'Book 3', price: 19.99 },
  ];

  return (
    <div>
      <h1>Shopping Cart</h1>
      {fakeBooks.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Price: {book.price}</p>
          <button onClick={() => handleAddToWishlist(book.id)}>Add to Wishlist</button>
          <button onClick={() => handleRemoveFromCart(book.id)}>Remove from Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
