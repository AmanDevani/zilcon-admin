import axios from 'axios';

const api = axios?.create({
  baseURL: process.env?.REACT_APP_SERVER_REST_URL
});

export default api;
