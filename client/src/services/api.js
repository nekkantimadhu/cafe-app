// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this if deployed backend
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
