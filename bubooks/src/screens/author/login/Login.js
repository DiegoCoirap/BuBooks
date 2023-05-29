import './Login.css'
import HeaderWithoutIcons from "../../../components/header/HeaderWithoutIcons";
import LoginForm from "../../../components/forms/LoginForm";
import {useNavigate} from "react-router-dom";


const LoginAuthor = () => {
    const navigate = useNavigate();


    return(
        <div className='loginAuthor'>
            <HeaderWithoutIcons/>
            <div className='boxLoginAuthor'>
                <button className='AbuttonLoginUser' onClick={() => navigate('/loginUser')}>User</button>
                <button className='AbuttonLoginAuthor'>Author</button>
                <div className='containerLoginAuthor'>
                    <h2 className='loginH2'>AUTHOR LOGIN</h2>
                    <LoginForm userType="author" />


                </div>
            </div>
        </div>
    )
}

export default LoginAuthor