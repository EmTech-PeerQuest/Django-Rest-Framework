// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

import Posts from './components/posts/Posts';
import PostLoadingComponent from './components/posts/PostLoading';

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: [],
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // ⛔ Redirect to login if token is missing
    //if (!token) {
    //  console.warn('No access token. Redirecting to login...');
    //  window.location.href = '/login'; // 👈 make sure this route exists in your app
    //  return;
    //}

    const fetchPosts = async () => {
      setAppState({ loading: true, posts: [] });
      try {
        const response = await fetch('http://127.0.0.1:8000/api/posts/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          console.warn('Unauthorized. Redirecting to login...');
          localStorage.removeItem('access_token'); // 🔒 remove invalid token
          //window.location.href = '/login'; // 👈 redirect again
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setAppState({ loading: false, posts: data });
        } else {
          console.error('Expected an array but got:', data);
          setAppState({ loading: false, posts: [] });
        }
      } catch (err) {
        console.error('API fetch error:', err);
        setAppState({ loading: false, posts: [] });
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Latest Posts</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
}

export default App;
