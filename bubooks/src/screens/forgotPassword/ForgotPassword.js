import './ForgotPassword.css'
import HeaderWithIcons from "../../components/header/HeatherWithIcons";
import {useNavigate} from "react-router-dom";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";


const ForgotPassword = () => {
    const navigate = useNavigate();


    return(
        <div className='forgotPassword'>
            <HeaderWithIcons/>
                <div className='containerForgotPassword'>
                    <h2 className='loginH2'>FORGOT YOUR PASSWORD?</h2>
                    <h3>Check your email to change it!</h3>
                    <ForgotPasswordForm/>
            </div>
        </div>
    )
}

export default ForgotPassword