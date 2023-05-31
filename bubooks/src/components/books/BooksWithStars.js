import React, {useEffect, useState} from 'react';
import './BooksWithStars.css';
import Background from '../../img/background.png';
import Rating from '@mui/material/Rating';
import Heart from '@mui/icons-material/FavoriteBorderOutlined';
import Cart from '@mui/icons-material/AddShoppingCartOutlined';
import Left from '@mui/icons-material/ArrowBackIosNewOutlined';
import Right from '@mui/icons-material/ArrowForwardIosOutlined';
import {Box} from '@mui/system';
import Api from "../../Api";
import ReactPaginate from 'react-paginate';
import BASE_URL from '../../environment';

const BooksWithStars = () => {
    const [bookData, setBookData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const booksPerPage = 16;
    const pagesVisited = pageNumber * booksPerPage;

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await Api.getBooks();
                setBookData(response.items);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookData();
    }, []);

    const addToWishlist = (id) => {
        console.log(`Book added to wishlist: ${id}`);
    };

    const addToCart = (id) => {
        console.log(`Book added to cart: ${id}`);
    };

    const navigateToBookPage = (id) => {
        window.location.href = `/bookpage/${id}`;
    };

    const getBookCoverUrl = (author) => {
        return `http://192.168.0.23:8000/media/images/authors/author_${author}/book/example.jpg
`;
    };

    const pageCount = Math.ceil(bookData.length / booksPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    return (
        <div className='containerBooks'>
        <div className='booksWithStars'>
            {bookData.slice(pagesVisited, pagesVisited + booksPerPage).map((book) => (
                <div key={book.title} className='bookList'>
                    <img src={getBookCoverUrl(book.author)} alt="bOOK COVER" onClick={() => navigateToBookPage(book.id)}
                         className='bookCover'/>
                    <div className='bookInformation'>
                        <div className='bookData'>
                            <h3 className='bookTitle'>{book.title}</h3>
                            <p className='bookAuthor'>{book.author}</p>
                            <p className='bookPrice'>{book.price} €</p>
                            <Box component="fieldset" borderColor="transparent" className="bookRating">
                                <Rating name="book-rating" value={book.rating} precision={0.5} readOnly/>
                            </Box>
                        </div>
                        <div className='bookButtons'>
                            <Heart onClick={() => addToWishlist(book.title)}></Heart>
                            <Cart onClick={() => addToCart(book.title)}></Cart>
                        </div>
                    </div>

                </div>
            ))}
            </div>
            <div className='bookPages'>
                <ReactPaginate
                    previousLabel={<Left/>}
                    nextLabel={<Right/>}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'}
                />
            </div>

            </div>
    );
};

export default BooksWithStars;
