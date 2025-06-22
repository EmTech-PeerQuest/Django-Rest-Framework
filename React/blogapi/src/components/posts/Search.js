import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    paddingTop: '56.25%', // 16:9
}));

const Search = () => {
    const theme = useTheme();
    const location = useLocation();
    const [appState, setAppState] = useState({
        posts: [],
    });

    useEffect(() => {
        // Log the full URL being requested to verify
        const requestUrl = 'search/' + location.search;
        console.log('Fetching search results from:', axiosInstance.defaults.baseURL + requestUrl);

        axiosInstance.get(requestUrl)
            .then((res) => {
                // IMPORTANT CHANGE HERE: Check if res.data has a 'results' key
                const allPosts = res.data.results || res.data; // Try to get 'results', otherwise use res.data directly

                if (Array.isArray(allPosts)) {
                    setAppState({ posts: allPosts });
                } else {
                    console.error("API response for posts is not an array (after checking 'results' key):", res.data);
                    setAppState({ posts: [] });
                }
                console.log('API Response data:', res.data); // Log original response
                console.log('Processed posts array:', allPosts); // Log extracted posts array
            }).catch(error => {
                console.error("Error fetching search results:", error);
                setAppState({ posts: [] });
            });
    }, [location.search]);

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {/* Display 'Loading posts...' initially, or if no posts found */}
                    {appState.posts.length > 0 ? (
                        appState.posts.map((post) => {
                            return (
                                <Grid key={post.id} xs={12} md={4}>
                                    <Link
                                        component={RouterLink}
                                        to={`/posts/${post.slug}`}
                                        color="inherit"
                                        underline="none"
                                        sx={{
                                            margin: theme.spacing(1, 1.5),
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                backgroundColor:
                                                    theme.palette.mode === 'light'
                                                        ? theme.palette.grey[200]
                                                        : theme.palette.grey[700],
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                            }}
                                        >
                                            <StyledCardMedia
                                                image={post.image} // Use the actual image URL from your API
                                                title={post.title}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="h2"
                                                    sx={{
                                                        fontSize: '16px',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {post.title.substr(0, 50)}...
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'left',
                                                        alignItems: 'baseline',
                                                        fontSize: '12px',
                                                        textAlign: 'left',
                                                        marginBottom: theme.spacing(2),
                                                    }}
                                                >
                                                    <Typography color="textSecondary">
                                                        {post.excerpt.substr(0, 40)}...
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            );
                        })
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary" align="center">
                                {/* Changed condition to show 'Loading...' or 'No posts found.' more clearly */}
                                {appState.posts.length === 0 && appState.loading ? "Loading posts..." : "No posts found."}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default Search;
