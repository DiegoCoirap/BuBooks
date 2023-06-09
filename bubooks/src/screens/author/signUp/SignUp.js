import './SignUp.css'
import HeaderWithoutIcons from "../../../components/header/HeaderWithoutIcons";
import {useNavigate} from "react-router-dom";
import SignUpForm from "../../../components/forms/SignUpForm";

const SignUpAuthor = () => {
    const navigate = useNavigate();

    return(
        <div className={'signUpAuthor'}>
            <HeaderWithoutIcons/>
            <div className='boxSignUpAuthor'>
                <button className='AbuttonSignUpUser' onClick={() => navigate('/signUpUser')}>User</button>
                <button className='AbuttonSignUpAuthor'>Author</button>
                <div className='containerSignUpAuthor'>
                    <h2 className='signUpH2'>AUTHOR SIGN UP</h2>
                    <SignUpForm/>
                </div>
            </div>
        </div>
    )
}

export default SignUpAuthor