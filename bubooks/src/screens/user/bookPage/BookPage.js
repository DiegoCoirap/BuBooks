import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Api from "../../../Api";
import './BookPage.css';

const BookPage = () => {
    const {id} = useParams();
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await Api.getBookById(id);
                if (response) {
                    setBookData(response);
                } else {
                    console.error('No se obtuvo ninguna respuesta del servidor');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookData();
    }, [id]);


    if (!bookData) {
        return <div>Loading...</div>;
    }

    return (

        <div className="bookPage">
            <h2>{bookData.title}</h2>
            <p>Author: {bookData.author}</p>
            <p>Price: {bookData.price}</p>
            <p>Description: {bookData.synopsis}</p>
            <p>Rating: {bookData.rating}</p>
            <p>{bookData.language}</p>
            <p>{bookData.target_audience}</p>
            <p>{bookData.}</p>
            {/* Add additional book information here */}
        </div>
    );
};

export default BookPage;
