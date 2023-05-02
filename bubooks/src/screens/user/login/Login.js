import './Login.css'
import HeaderWithoutIcons from "../../../components/header/HeaderWithoutIcons";
import LoginForm from "../../../components/forms/LoginForm";
import {useNavigate} from "react-router-dom";


const LoginUser = () => {
    const navigate = useNavigate();


    return(
        <div className='loginAuthor'>
            <HeaderWithoutIcons/>
            <div className='boxLoginUser'>
                <button className='UbuttonLoginUser' >User</button>
                <button className='UbuttonLoginAuthor'onClick={() => navigate('/loginAuthor')}>Author</button>
                <div className='containerLoginUser'>
                    <h2 className='loginH2'>USER LOGIN</h2>
                    <LoginForm/>

                </div>
            </div>
        </div>
    )
}

export default LoginUser