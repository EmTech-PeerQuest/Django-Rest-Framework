import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Container,
	Link,
} from '@mui/material';

const Search = () => {
	const [appState, setAppState] = useState({
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get(`search/${window.location.search}`).then((res) => {
			setAppState({ posts: res.data });
			console.log(res.data);
		});
	}, []);

	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{appState.posts.map((post) => (
						<Grid item key={post.id} xs={12} md={4}>
							<Card>
								<Link
									color="text.primary"
									href={`/post/${post.slug}`}
									underline="none"
									sx={{ display: 'block', m: 1 }}
								>
									<CardMedia
										component="div"
										sx={{
											paddingTop: '56.25%',
											backgroundImage: 'url(https://source.unsplash.com/random)',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
										}}
									/>
								</Link>
								<CardContent>
									<Typography
										variant="h6"
										component="h2"
										sx={{ fontSize: 16, textAlign: 'left' }}
										gutterBottom
									>
										{post.title?.substring(0, 50)}...
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{
											fontSize: 12,
											textAlign: 'left',
											mb: 2,
										}}
									>
										{post.excerpt?.substring(0, 40)}...
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Search;
