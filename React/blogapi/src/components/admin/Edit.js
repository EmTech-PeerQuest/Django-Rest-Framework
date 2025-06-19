import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Container,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Box,
} from '@mui/material';

export default function EditPost() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		excerpt: '',
		content: '',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axiosInstance
			.get(`admin/edit/postdetail/${id}`)
			.then((res) => {
				setFormData({
					title: res.data.title || '',
					slug: res.data.slug || '',
					excerpt: res.data.excerpt || '',
					content: res.data.content || '',
				});
				setLoading(false);
			})
			.catch((error) => {
				console.error('Failed to fetch post:', error);
				alert('Error loading post data.');
				setLoading(false);
			});
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.put(`admin/edit/${id}/`, {
				...formData,
				author: 1,
			});
			alert('Post updated successfully!');
			navigate('/admin/');
		} catch (error) {
			console.error('Failed to update post:', error);
			alert('Error updating post. Please try again.');
		}
	};

	if (loading) {
		return <Typography align="center">Loading post data...</Typography>;
	}

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Edit Post
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Post Title"
								name="title"
								value={formData.title}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Post Excerpt"
								name="excerpt"
								value={formData.excerpt}
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Slug"
								name="slug"
								value={formData.slug}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Content"
								name="content"
								value={formData.content}
								onChange={handleChange}
								multiline
								rows={6}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Update Post
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
