import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function DeletePost() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axiosInstance.delete(`admin/delete/${id}`);
			alert('Post deleted successfully.');
			navigate('/admin/');
		} catch (error) {
			console.error('Error deleting post:', error);
			alert('There was an error deleting the post.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box display="flex" flexDirection="column" alignItems="center" mt={5}>
				<Typography variant="h6" gutterBottom>
					Are you sure you want to delete this post?
				</Typography>
				<Button
					variant="contained"
					color="error"
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? 'Deleting...' : 'Confirm Delete'}
				</Button>
			</Box>
		</Container>
	);
}
