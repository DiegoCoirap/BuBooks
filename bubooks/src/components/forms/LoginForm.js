import './LoginForm.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (username === '') {
      setError('The username cannot be empty.');
      return;
    }
    if (password === '') {
      setError('The password cannot be empty.');
      return;
    }
    try {
      const { token, error } = await Api.login({username, password});
      if (error) {
        setError(error);
      } else {
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/');
      }
    } catch (error) {
      setError("Error. Try again.");
    }
  }

  return (
    <div>
      <form className='loginForm' onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input type='text' name='username' value={username} onChange={handleInputChange}/>
        <label>Password</label>
        <input type='password' name='password' value={password} onChange={handleInputChange}/>
        <a className='forgotLink' onClick={() => navigate('/forgotPassword')}>Forgot your password?</a>
        <button type='submit' className='buttonLogin'>Login</button>
        <p className='signUpLink'>New here? <a className='signUpLink' onClick={() => navigate('/signUpUser')}>Sign
          up</a></p>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;