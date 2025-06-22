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

// ✅ Attach token correctly with space
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle token refresh if expired
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

        // 🔧 Use correct Bearer prefix
        originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access;

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
