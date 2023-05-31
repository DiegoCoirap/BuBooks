import axios from 'axios';
import BASE_URL from './environment';

const SendRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url: BASE_URL + url,
      data,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Error. Try again.');
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Incorrect username or password.');
    } else {
      throw error; // Throw the original error
    }
  }
};

const Books = async (url, method = 'get', data = null) => {
  try {
    const response = await SendRequest(method, url, data);
    console.log('Response data:', response); // Add this line to print the response data
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBookById = async (id) => {
  try {
    const response = await Books(`/bubooks/book/${id}`);
    return response; // Accede directamente a response en lugar de response.items
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  async login(props) {
    return await SendRequest('post', '/bubooks/login', {
      username: props.username,
      password: props.password,
    });
  },

  async signUp(props) {
    return await SendRequest('post', '/bubooks/sign-up-user', {
      username: props.username,
      email: props.email,
      password: props.password,
      is_author: props.is_author,
    });
  },

  async getBooks() {
    return await Books('/bubooks/library');
  },

  getBookById,
};
