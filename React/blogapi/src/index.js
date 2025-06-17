import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

// Placeholder component for Post Detail
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { slug } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Post Detail Page</h2>
      <p>This is a placeholder for the post: <strong>{slug}</strong></p>
      <p>Use `useParams()` to fetch this post's data from the backend using the slug.</p>
    </div>
  );
};

// MUI theme (customize this if needed)
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 120px)', padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for does not exist.</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
