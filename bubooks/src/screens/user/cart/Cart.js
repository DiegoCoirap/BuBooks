import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const fetchCartBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
        };

        const response = await axios.get(
          'http://192.168.1.133:8000/bubooks/cart',
          config
        );
        setCartBooks(response.data);
      } catch (error) {
        console.error('Error fetching cart books:', error);
      }
    };

    fetchCartBooks();
  }, []);

  const handlePayPalPayment = async () => {
    try {
      // Perform PayPal payment logic here

      // Mark books as bought
      const markBooksAsBought = async () => {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const promises = cartBooks.map((book) => {
          const payload = {
            book_id: book.id,
          };

          return axios.post(
            'http://192.168.1.133:8000/bubooks/book-bought',
            payload,
            config
          );
        });

        try {
          await Promise.all(promises);

          // Clear the cart after successful payment
          setCartBooks([]);
        } catch (error) {
          console.error('Error marking books as bought:', error);
        }
      };

      await markBooksAsBought();
    } catch (error) {
      console.error('Error during PayPal payment:', error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartBooks.length > 0 ? (
        <div>
          <h2>Books in Cart:</h2>
          <ul>
            {cartBooks.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
          <button onClick={handlePayPalPayment}>Pay with PayPal</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;

