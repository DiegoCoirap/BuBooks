import './SignUpForm.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../../environment";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

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
    try {
      const response = await axios.post(BASE_URL + '/users', {
        username: username,
        email: email,
        password: password
      });
      if (response.status === 201) {
        const { token } = response.data;
        setToken(token);
        localStorage.setItem('token', token);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message)
      } else if (error.response.status === 401) {
        setError("A user already exists with your username or email.")
      } else {
        setError("Error. Try again.")
      }
    }
  }

  return (
    <div>
      <form className='signUpForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' name='username' onChange={handleSubmit} />
        <label>Email</label>
        <input type='email' name='email' onChange={handleSubmit} />
        <label>Confirm your email</label>
        <input type='email' name='confirmEmail' onChange={handleSubmit} />
        <label>Password</label>
        <input type='password' name='password' onChange={handleSubmit} />
        <label>Confirm your password</label>
        <input type='password' name='confirmPassword' onChange={handleSubmit} />
        <button type='submit' className='buttonSignUp' onClick={() => navigate('/')}>Sign Up</button>
        <p className='signUpLink'>Already have an account? <a className='signUpLink' onClick={() => navigate('/loginUser')}>Login</a></p>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default SignUpForm