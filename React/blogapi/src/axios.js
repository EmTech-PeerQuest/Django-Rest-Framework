import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ✅ Always attach fresh access token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer' + accessToken;  // 🔧 changed from 'Bearer'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Handle 401s and auto-refresh token
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
        const res = await axios.post(baseURL + 'token/refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });

        localStorage.setItem('access_token', res.data.access);

        // Set new token for retry
        originalRequest.headers['Authorization'] = 'JWT ' + res.data.access;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
