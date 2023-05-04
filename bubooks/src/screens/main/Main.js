import './Main.css'
import HeaderWithIcons from "../../components/header/HeatherWithIcons";
import SearchingList from "../../components/searching/searchingList/SearchingList";
import SearchingBar from "../../components/searching/searchingBar/SearchingBar";
import Tags from "../../components/searching/tags/Tags";
import BooksWithStars from "../../components/books/BooksWithStars";
const Main = () => {

    return (
        <div className='main'>
            <HeaderWithIcons/>
            <div className='mainBody'>
                <SearchingList/>
                <div className='rightMain'>
                    <SearchingBar/>
                    <Tags/>
                    <BooksWithStars/>

                </div>
            </div>
        </div>
    )
}

export default Main