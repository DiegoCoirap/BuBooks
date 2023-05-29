import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import NotFound from './screens/NotFound';
import LoginAuthor from "./screens/author/login/Login";
import Main from "./screens/main/Main";
import LoginUser from "./screens/user/login/Login";
import SignUpAuthor from "./screens/author/signUp/SignUp";
import SignUpUser from "./screens/user/signUp/SignUp";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword";
import BookPage from "./screens/user/bookPage/BookPage";
import ShoppingCart from "./screens/user/shoppingCart/ShoppingCart";
import UserProfile from "./screens/user/profile/Profile";

function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Main />} />
      <Route path='loginAuthor' element={<LoginAuthor />} />
      <Route path='loginUser' element={<LoginUser />} />
      <Route path='signUpAuthor' element={<SignUpAuthor />} />
      <Route path='signUpUser' element={<SignUpUser />} />
      <Route path='forgotPassword' element={<ForgotPassword />} />
      <Route path='bookPage/:id' element={<BookPage />} />
      <Route path="/shoppingcart" element={<ShoppingCart/>} />
     <Route path="/userProfile" element={<UserProfile/>} />
      </Routes>
  );
}

export default App;
