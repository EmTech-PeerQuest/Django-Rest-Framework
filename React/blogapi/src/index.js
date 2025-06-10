import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import your components
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import App from './App'; // Your App.js, which currently displays "Latest Posts"

// Placeholder for a Post Detail Page
// You'll want to create a dedicated 'PostDetail.js' component later
// to fetch and display individual post content based on the slug.
const PostDetail = () => (
  <div>
    <h2>Post Detail Page</h2>
    <p>This is a placeholder. You'll create a full PostDetail.js component here.</p>
    <p>It will likely fetch data using `useParams()` to get the post slug.</p>
  </div>
);


const theme = createTheme(); // Material-UI theme setup

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides a consistent baseline for CSS */}
      <Router> {/* The main router component */}
        <Header /> {/* Header appears on all pages */}
        <main style={{ minHeight: 'calc(100vh - 120px)' }}> {/* Basic styling to push footer down */}
          <Routes> {/* Defines your application's routes */}
            {/* Route for the home page, rendering your App component */}
            <Route path="/" element={<App />} />

            {/* Route for the search results page, rendering the Search component */}
            <Route path="/search" element={<Search />} />

            {/* Route for individual post detail pages, using a dynamic 'slug' parameter */}
            <Route path="/post/:slug" element={<PostDetail />} />

            {/* Placeholder routes for authentication pages */}
            <Route path="/register" element={<div>Register Page (TODO)</div>} />
            <Route path="/login" element={<div>Login Page (TODO)</div>} />
            <Route path="/logout" element={<div>Logout Page (TODO)</div>} />

            {/* Catch-all route for any undefined paths (404 Not Found) */}
            <Route path="*" element={<div><h1>404 Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
          </Routes>
        </main>
        <Footer /> {/* Footer appears on all pages */}
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);


// Optional: service worker (you can still use it if needed)
//import * as serviceWorker from './serviceWorker';
//serviceWorker.unregister();

