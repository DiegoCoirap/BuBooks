import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import NotFound from './screens/NotFound'
import LoginAuthor from "./screens/author/login/Login";
import Main from "./screens/main/Main";
import LoginUser from "./screens/user/login/Login";
import SignUpAuthor from "./screens/author/signUp/SignUp";
import SignUpUser from "./screens/user/signUp/SignUp";

function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFound/>}></Route>
      <Route path='/' element={<Main/>}></Route>
      <Route path='loginAuthor' element={<LoginAuthor/>}></Route>
      <Route path='loginUser' element={<LoginUser/>}></Route>
      <Route path='signUpAuthor' element={<SignUpAuthor/>}></Route>
        <Route path='signUpUser' element={<SignUpUser/>}></Route>
    </Routes>
  );
}

export default App;
