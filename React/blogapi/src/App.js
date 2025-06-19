// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: [],
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setAppState({ loading: true, posts: [] });
      try {
        const response = await fetch('http://127.0.0.1:8000/api/posts/');
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
    <>
      <div className="App">
        <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Latest Posts</h1>
        <PostLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </>
  );
}

export default App;
