/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";
import {useNavigate} from "react-router-dom";
import './Profile.css'

const UserProfile = ({ onRemoveFromWishlist, onLogout }) => {
  const navigate = useNavigate();
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
        localStorage.removeItem('token');
        navigate('/');
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
*/
import React, {useState, useEffect} from 'react';
import Download from '@mui/icons-material/FileDownloadOutlined';
import axios from 'axios';
import HeaderWithIcons from "../../../components/header/HeatherWithIcons";
import {useNavigate} from "react-router-dom";
import './Profile.css';
import Delete from '@mui/icons-material/ClearOutlined';

const UserProfile = ({onRemoveFromWishlist, onLogout}) => {
    const navigate = useNavigate();
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Simulating API calls to fetch purchased books and wishlist
        const fetchPurchasedBooks = async () => {
            // Simulated response data
            const fakePurchasedBooks = [
                {id: 1, title: 'Purchased Book 1'},
                {id: 2, title: 'Purchased Book 2'},
                {id: 3, title: 'Purchased Book 3'},
            ];

            setPurchasedBooks(fakePurchasedBooks);
        };

        const fetchWishlist = async () => {
            // Simulated response data
            const fakeWishlist = [
                {id: 4, title: 'Wishlist Book 1'},
                {id: 5, title: 'Wishlist Book 2'},
                {id: 6, title: 'Wishlist Book 3'},
            ];

            setWishlist(fakeWishlist);
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
            // Simulating download logic
            console.log('Descargando libro:', downloadedBook.title);
        }
    };

    const handleRemoveFromWishlist = (bookId) => {
        onRemoveFromWishlist(bookId);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className='userProfilePage'>
            <HeaderWithIcons/>
            <div className="userProfileMain">
                <div className="userProfileMainLeft"><h1>Your Profile</h1>

                <button className='userProfileLogOut' onClick={handleLogout}>Logout</button>

                <h2 className='userProfilePurchaseBooks'>Purchased Books</h2>
                {message === 'No tienes libros comprados.' && <p>{message}</p>}
                {purchasedBooks.length > 0 ? (
                    purchasedBooks.map((book) => (
                        <div className='userProfileList' key={book.id}>
                            <h3>{book.title}</h3>
                            <Download onClick={() => handleDownloadBook(book.id)} />
                        </div>
                    ))
                ) : (
                    message !== 'No tienes libros comprados.' && <p>{message}</p>
                )}</div>

                <div className="userProfileMainRight">
                    <h1 className='userProfileWishList'>Wishlist</h1>
                {message === 'No tienes elementos en tu lista de deseos.' && <p>{message}</p>}
                {wishlist.length > 0 ? (
                    wishlist.map((book) => (
                        <div key={book.id} className='userProfileList'>
                            <h3>{book.title}</h3>
                            <Delete onClick={() => handleRemoveFromWishlist(book.id)}/>
                        </div>
                    ))
                ) : (
                    message !== 'No tienes elementos en tu lista de deseos.' && <p>{message}</p>
                )}
                </div>

            </div>
        </div>
    );
};

export default UserProfile;
