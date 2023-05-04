import './SignUpForm.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../../environment";
import Api from "../../Api";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'email'){
      setEmail(value);
    } else if (name === 'confirmEmail'){
      setConfirmEmail(value);
    } else if (name === 'confirmPassword'){
      setConfirmPassword(value);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '') {
      setError('The username cannot be empty');
      return;
    }
    if (email === '') {
      setError('The email cannot be empty');
      return;
    }
    if (email !== confirmEmail) {
      setError('Emails do not match.');
      return;
    }
    if (password === '') {
      setError('The email password be empty');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try{
      const {token, error} = await Api.signUp({username, email, password});
      if (error){
        setError(error);
      }else{
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/');
      }
    }catch (error){
      setError('Error. Try again.')
    }

  }

  return (
    <div>
      <form className='signUpForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' name='username' autoComplete='off' onChange={handleInputChange} />
        <label>Email</label>
        <input type='email' name='email' autoComplete='off' onChange={handleInputChange} />
        <label>Confirm your email</label>
        <input type='email' name='confirmEmail' autoComplete='off' onChange={handleInputChange} />
        <label>Password</label>
        <input type='password' name='password' autoComplete='off' onChange={handleInputChange} />
        <label>Confirm your password</label>
        <input type='password' name='confirmPassword' autoComplete='off' onChange={handleInputChange} />
        <button type='submit' className='buttonSignUp' >Sign Up</button>
        <p className='signUpLink'>Already have an account? <a className='signUpLink' onClick={() => navigate('/loginUser')}>Login</a></p>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default SignUpForm
