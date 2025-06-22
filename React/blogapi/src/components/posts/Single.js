// src/components/Single.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';

// MUI v5
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Single() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/posts/${slug}/`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Loading post...
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Post not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {post.excerpt}
        </Typography>
        <Typography variant="body1" align="left">
          {post.content}
        </Typography>
      </Box>
    </Container>
  );
}
