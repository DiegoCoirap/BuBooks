import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import HeaderWithIcons from '../../../components/header/HeatherWithIcons';

const AuthorProfile = () => {
    const {alias} = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.post(
                    'http://192.168.1.133:8000/bubooks/author-profile',
                    {
                        alias,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setAuthor(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAuthor();
    }, [alias]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleEditProfile = () => {
        navigate('/editProfile');
    };

    const handleUploadBook = () => {
        navigate('/uploadBook');
    };

    const navigateToBookPage = (id) => {
        navigate(`/book/${id}`)
    }

    if (!author) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <HeaderWithIcons/>
            <h1>{author.alias}</h1>
            <img src={author.image} alt="Author"/>
            <p>{author.about_you}</p>
            <h2>Books</h2>
            <ul>
                {author.books.map((book) => (
                    <li key={book.id}>
                        <img src={book.image} alt="BookCover" onClick={() => navigateToBookPage(book.id)}/>
                        {book.title}
                    </li>
                ))}
            </ul>

            <button onClick={handleEditProfile}>Edit Profile</button>
            <button onClick={handleUploadBook}>Upload Book</button>
            <button className="logoutButton" onClick={handleLogout}>
                Log out
            </button>
        </div>
    );
};

export default AuthorProfile;
