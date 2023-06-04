import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css'
import HeaderWithoutIcons from "../../../components/header/HeaderWithoutIcons";

const Cart = () => {
  const [cartBooks, setCartBooks] = useState([]);

  /*useEffect(() => {
    const fetchCartBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*!/!*',
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
  }, []);*/
  useEffect(() => {
    // Simulating API call to fetch cart books
    const fetchCartBooks = async () => {
      // Simulated response data
      const fakeData = [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
        { id: 3, title: 'Book 3' },
      ];

      setCartBooks(fakeData);
    };

    fetchCartBooks();
  }, []);

  /*const handlePayPalPayment = async () => {
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
  };*/
  const handlePayPalPayment = async () => {
    try {
      // Perform PayPal payment logic here

      // Mark books as bought
      const markBooksAsBought = async () => {
        // Simulated successful marking of books as bought

        // Clear the cart after successful payment
        setCartBooks([]);
      };

      await markBooksAsBought();
    } catch (error) {
      console.error('Error during PayPal payment:', error);
    }
  };

  return (
    <div className='cartPage'>
      <HeaderWithoutIcons/>
      <div className="cartPageBody">
        <h1>Your Cart</h1>
      {cartBooks.length > 0 ? (
        <div className='cart'>
          <ul>
            {cartBooks.map((book) => (
              <li key={book.id}>
                {book.title}
              </li>
            ))}
          </ul>
          <button onClick={handlePayPalPayment} className='paypalButton'>Pay with PayPal</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
      </div>

  );
};

export default Cart;

