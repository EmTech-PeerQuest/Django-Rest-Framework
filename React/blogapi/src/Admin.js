import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Posts from './components/admin/Posts';
import PostLoadingComponent from './components/posts/PostLoading';
import axiosInstance from './axios';

function Admin() {
    const PostLoading = PostLoadingComponent(Posts);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(true);
    const [isSuperuser, setIsSuperuser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current user info
        axiosInstance.get('user/me/')
            .then(res => {
                if (res.data.is_superuser) {
                    setIsSuperuser(true);
                } else {
                    navigate('/'); // Not superuser, redirect to home
                }
            })
            .catch(() => {
                navigate('/login'); // Not authenticated, redirect to login
            })
            .finally(() => setChecking(false));
    }, [navigate]);

    useEffect(() => {
        if (!isSuperuser) return;
        let isMounted = true;
        axiosInstance.get('posts/')
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
    }, [isSuperuser]);

    if (checking) return <div>Checking permissions...</div>;
    if (!isSuperuser) return null;

    return (
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={loading} posts={posts} />
        </div>
    );
}

export default Admin;
