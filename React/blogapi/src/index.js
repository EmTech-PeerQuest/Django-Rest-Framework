import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/posts/Search';
import App from './App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Single from './components/posts/Single';
import Admin from './Admin';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Delete from './components/admin/Delete';
import ScrollToTop from './ScrollToTop'; // <-- Import here
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <GoogleOAuthProvider clientId="802160767636-4m14n7e8uf53cn02v01gmhbsgud18eop.apps.googleusercontent.com">
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop /> {/* <-- Add here */}
        <Header />
        <main style={{ minHeight: 'calc(100vh - 120px)', padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts/:slug" element={<Single />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<Create />} />
            <Route path="/admin/edit/:id" element={<Edit />} />
            <Route path="/admin/delete/:id" element={<Delete />} />
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
    </GoogleOAuthProvider>;
    </AuthProvider>
  </React.StrictMode>
);
