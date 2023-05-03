import axios from "axios";
import BASE_URL from "./environment";

export default {
    async login() {
        try {
            const response = await axios.post(BASE_URL + '/users', {
                username: username,
                email: email,
                password: password
            });
            if (response.status === 201) {
                const {token} = response.data;
                setToken(token);
                localStorage.setItem('token', token);
                localStorage.setItem('loggedIn', 'true');
                navigate('/');
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
}