import './App.css';
import {Route, Routes} from "react-router-dom";
import NotFound from './screens/NotFound';
import LoginAuthor from "./screens/author/login/Login";
import Main from "./screens/main/Main";
import LoginUser from "./screens/user/login/Login";
import SignUpAuthor from "./screens/author/signUp/SignUp";
import SignUpUser from "./screens/user/signUp/SignUp";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword";
import BookPage from "./screens/user/bookPage/BookPage";
import Cart from "./screens/user/cart/Cart";
import UserProfile from "./screens/user/profile/Profile";
import AuthorUserProfile from "./screens/user/authorProfile/AuthorProfile";
import AuthorProfile from "./screens/author/authorProfile/AuthorProfile";
import CreateAuthor from "./screens/author/createProfile/CreateProfile";
import EditAuthor from "./screens/author/editProfile/EditProfile";
import UploadBook from "./screens/author/uploadBook/UploadBook";
import BookPageAuthor from "./screens/author/bookPage/BookPage";


function App() {
    return (
        <Routes>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/' element={<Main/>}/>
            <Route path='loginAuthor' element={<LoginAuthor/>}/>
            <Route path='loginUser' element={<LoginUser/>}/>
            <Route path='signUpAuthor' element={<SignUpAuthor/>}/>
            <Route path='signUpUser' element={<SignUpUser/>}/>
            <Route path='forgotPassword' element={<ForgotPassword/>}/>
            <Route path='bookPage/:id' element={<BookPage/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/userProfile" element={<UserProfile/>}/>
            <Route path="/author/:alias" element={<AuthorUserProfile/>}/>
            <Route path="/createProfile" element={<CreateAuthor/>}/>
            <Route path="/editProfile" element={<EditAuthor/>}/>
            <Route path="/authorProfile/:alias" element={<AuthorProfile/>}/>
            <Route path="book/:id" element={<BookPageAuthor/>}/>
                <Route path="/uploadBook" element={<UploadBook/>}/>

        </Routes>
    );
}

export default App;
