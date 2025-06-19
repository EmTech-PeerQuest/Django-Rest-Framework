import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import {
	CssBaseline,
	Container,
	Typography,
	Box
} from '@mui/material';

export default function Post() {
	const { slug } = useParams();

	const [data, setData] = useState({
		posts: {},
	});

	useEffect(() => {
		axiosInstance.get('post/' + slug).then((res) => {
			setData({
				posts: res.data,
			});
			console.log(res.data);
		});
	}, [slug]);

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<Box
				sx={{
					mt: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						{data.posts.title}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						{data.posts.excerpt}
					</Typography>
				</Container>
			</Box>
		</Container>
	);
}
