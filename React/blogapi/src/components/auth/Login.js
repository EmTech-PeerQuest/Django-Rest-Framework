// src/pages/SignIn.js
import React, { useState, useContext } from 'react';
import axiosInstance from '../../axios/login';
import { useNavigate, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: 8,
    backgroundColor: '#f50057'
  },
  form: {
    width: '100%',
    marginTop: 8
  },
  submit: {
    margin: '24px 0 16px'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post('auth/token/', {
        grant_type: 'password',
        username: formData.email,
        password: formData.password,
        client_id: 'HzUMg62DjoHgrtPSnMqKy2qs8hPBneywrmApogvu',
        client_secret:
          'KMqTFHWXjdwvtydVBiubnQSR37D9i4xY7WzuaMOu7qwLrVunbGpLXHtgpLfgJEwN95JeQCBpaaV4dsZaeRuJIZASoRetsa4TkqSUYKu66gC8Lq1eSYWgnF9FapIRadgY'
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        login(); // ✅ Update auth state
        navigate('/'); // ✅ Redirect to home
      })
      .catch(() => {
        alert('Login failed. Please check your credentials and try again.');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axiosInstance.post('auth/google/', {
                  token: credentialResponse.credential
                });

                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                login(); // ✅ Trigger header UI update
                navigate('/');
              } catch {
                alert('Google login failed. Please try again.');
              }
            }}
            onError={() => {
              alert('Google login failed. Please try again.');
            }}
          />

          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
