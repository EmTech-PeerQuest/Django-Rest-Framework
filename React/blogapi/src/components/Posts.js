import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Posts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <Typography variant="h6">Cannot find any posts, sorry.</Typography>;
  }

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="div"
                sx={{
                  height: 0,
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  backgroundImage: 'url(https://source.unsplash.com/random)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                title="Post image"
              />
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ textAlign: 'left' }}>
                  {post.title?.substring(0, 50)}...
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, textAlign: 'left' }}
                >
                  {post.excerpt?.substring(0, 60)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
