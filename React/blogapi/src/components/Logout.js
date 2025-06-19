// src/components/Logout.js
import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        await axiosInstance.post('user/logout/blacklist/', {
          refresh_token: refreshToken,
        });
      } catch (error) {
        // Optionally log error, but proceed to clear tokens and redirect
        console.error('Logout failed:', error.response?.data || error.message);
      } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        navigate('/login');
      }
    };

    logout();
  }, [navigate]);

  return (
    <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: '20vh' }}>
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Logging out...
      </Typography>
    </Container>
  );
}
