import './Main.css'
import HeaderWithIcons from "../../components/header/HeatherWithIcons";
import SearchingList from "../../components/searching/searchingList/SearchingList";
import SearchingBar from "../../components/searching/searchingBar/SearchingBar";
import Tags from "../../components/searching/tags/Tags";
import BooksWithStars from "../../components/books/BooksWithStars";
const Main = () => {
    const date = new Date ()
    const month =  date.toLocaleString('default', {month:'long'})

    return (
        <div className='main'>
            <HeaderWithIcons/>
            <div className='mainBody'>
                <SearchingList/>
                <div className='rightMain'>
                    <SearchingBar/>
                    <Tags/>
                    <SearchingBar/>
                    <h2>{month} best sellers</h2>
                    <BooksWithStars/>
                </div>
            </div>
        </div>
    )
}

export default Main