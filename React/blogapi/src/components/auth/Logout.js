import React, { useEffect } from 'react';
import axios from 'axios'; // <-- Use plain axios here
import { useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      console.log('Logging out with refresh_token:', refreshToken);

      try {
        await axios.post('http://127.0.0.1:8000/api/user/logout/blacklist/', {
          refresh_token: refreshToken,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Clean up
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
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
