// src/axios.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token')
      ? 'Bearer ' + localStorage.getItem('access_token')
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh_token')
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });

        localStorage.setItem('access_token', res.data.access);
        axiosInstance.defaults.headers['Authorization'] =
          'Bearer ' + res.data.access;
        originalRequest.headers['Authorization'] =
          'Bearer ' + res.data.access;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
