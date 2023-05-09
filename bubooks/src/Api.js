import axios from "axios";
import BASE_URL from "./environment";
import { useState } from "react";

const SendRequest = async (method, url, data = null) => {
  const [token, setToken] = useState('');

  try {
    const response = await axios({
      method,
      url: BASE_URL + url,
      data,
    });

    console.log('response:', response.status, response.data);


    if (response.status === 200 || response.status === 201) {
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      return token;
    } else {
      throw new Error("Error. Try again.");
    }
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else if (error.response.status === 401) {
        throw new Error("Incorrect username or password.");
    } else {
      throw new Error("Error. Try again.");
    }
  }
};


const Books = async (url, method = "get", data = null) => {
  try {
    const response = await axios({
      method,
      url: BASE_URL + url,
      data,
    });


    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else if (error.response.status === 401) {
      throw new Error("Incorrect username or password.");
    } else {
      throw new Error("Error. Try again.");
    }
  }
};

export default {
  async login(props) {
    return await SendRequest('post', '/auth/login', {
      username: props.username,
      password: props.password,
    });
  },

  async signUp(props) {
  return await SendRequest('post', '/bubooks/sign-in-user', {
    use: {
      username: props.username,
      email: props.email,
      password: props.password,
    },
  });
},
};
