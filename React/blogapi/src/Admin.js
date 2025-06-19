import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/Posts';
import PostLoadingComponent from './components/posts/PostLoading';
import axiosInstance from './axios';

function Admin() {
	const PostLoading = PostLoadingComponent(Posts);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		// ✅ FIXED: Correct the endpoint here
		axiosInstance.get('posts/')  // change from 'admin/' to 'posts/'
			.then((res) => {
				if (isMounted) {
					setPosts(res.data);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.error('Error fetching posts:', err);
				if (isMounted) {
					setPosts([]);
					setLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="App">
			<h1>Latest Posts</h1>
			<PostLoading isLoading={loading} posts={posts} />
		</div>
	);
}

export default Admin;
