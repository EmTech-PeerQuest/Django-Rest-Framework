import React from 'react';
import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Link,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';

const Posts = ({ posts }) => {
	if (!posts || posts.length === 0) {
		return <p>Cannot find any posts, sorry.</p>;
	}

	return (
		<Container maxWidth="md" component="main">
			<Paper elevation={3}>
				<TableContainer sx={{ mt: 4 }}>
					<Table stickyHeader aria-label="posts table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{posts.map((post) => (
								<TableRow key={post.id}>
									<TableCell>{post.id}</TableCell>
									<TableCell>{post.category || 'Uncategorized'}</TableCell>
									<TableCell>
										<Link
											component={RouterLink}
											to={`/post/${post.slug}`}
											underline="hover"
											color="text.primary"
											sx={{ mx: 1 }}
										>
											{post.title || 'Untitled'}
										</Link>
									</TableCell>
									<TableCell>
										<Link
											component={RouterLink}
											to={`/admin/edit/${post.id}`}
											underline="none"
											color="text.primary"
											sx={{ mx: 1 }}
										>
											<EditIcon />
										</Link>
										<Link
											component={RouterLink}
											to={`/admin/delete/${post.id}`}
											underline="none"
											color="error.main"
											sx={{ mx: 1 }}
										>
											<DeleteForeverIcon />
										</Link>
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell colSpan={4} align="right">
									<Button
										component={RouterLink}
										to="/admin/create"
										variant="contained"
										color="primary"
									>
										New Post
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
};

export default Posts;
