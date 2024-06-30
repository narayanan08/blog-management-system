// auth.js

import axios from 'axios';

const API_URL = 'https://8dac-14-194-85-214.ngrok-free.app/api/auth/';  // Replace with your API URL

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
