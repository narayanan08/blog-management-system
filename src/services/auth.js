// auth.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';  // Replace with your API URL

const register = async (username, password) => {
  try {
    const response = await axios.post(API_URL + 'signup', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const AuthService = {
  register,
};

export default AuthService;
