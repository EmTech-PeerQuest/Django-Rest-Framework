import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(8),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')(({ theme }) => ({
	width: '100%',
	marginTop: theme.spacing(3),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(3, 0, 2),
}));

export default function Create() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		excerpt: '',
		content: '',
	});

	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w-]+/g, '') // ✅ Clean up invalid characters
			.replace(/--+/g, '-') // Replace multiple dashes with single dash
			.replace(/^-+/, '') // Trim start dashes
			.replace(/-+$/, ''); // Trim end dashes
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			...(name === 'title' && { slug: slugify(value) }),
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.post(`admin/create/`, {
				title: formData.title,
				slug: formData.slug,
				author: 1,
				excerpt: formData.excerpt,
				content: formData.content,
			});
			navigate('/admin/');
		} catch (error) {
			console.error('Error creating post:', error);
			alert('There was an error submitting the post.');
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<StyledBox>
				<StyledAvatar />
				<Typography component="h1" variant="h5">
					Create New Post
				</Typography>
				<StyledForm onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Post Title"
								name="title"
								value={formData.title}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="excerpt"
								label="Post Excerpt"
								name="excerpt"
								value={formData.excerpt}
								onChange={handleChange}
								multiline
								rows={3}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								id="slug"
								label="Slug"
								name="slug"
								value={formData.slug}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="content"
								label="Content"
								name="content"
								value={formData.content}
								onChange={handleChange}
								multiline
								rows={5}
							/>
						</Grid>
					</Grid>
					<StyledSubmitButton
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
					>
						Create Post
					</StyledSubmitButton>
				</StyledForm>
			</StyledBox>
		</Container>
	);
}
