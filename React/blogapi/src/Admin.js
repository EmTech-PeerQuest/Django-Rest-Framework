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
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get('user/me/');
                console.log('User data:', res.data); // ✅ Debug

                if (res.data.is_superuser) {
                    setIsSuperuser(true);
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error('Auth error:', err.response || err); // ✅ Debug
                navigate('/login');
            } finally {
                setChecking(false);
            }
        };

        fetchUser();
    }, [navigate]);

    useEffect(() => {
        if (!isSuperuser) return;
        let isMounted = true;

        const fetchPosts = async () => {
            try {
                const res = await axiosInstance.get('posts/');
                if (isMounted) {
                    setPosts(res.data);
                }
            } catch (err) {
                console.error('Error fetching posts:', err);
                if (isMounted) setPosts([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, [isSuperuser]);

    if (checking) return <div>🔒 Checking admin permissions...</div>;

    return (
        isSuperuser ? (
            <div className="App">
                <h1>🛡️ Admin Panel: Latest Posts</h1>
                <PostLoading isLoading={loading} posts={posts} />
            </div>
        ) : null
    );
}

export default Admin;
