// useFetchUserPosts.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCache } from '../context/CacheContext';

const useFetchUserPosts = (userId) => {
    const { getCachedData, setCachedData } = useCache();

    const cachedUserPosts = getCachedData(`user-posts-${userId}`);
    const [posts, setPosts] = useState(cachedUserPosts || []);
    const [loading, setLoading] = useState(!cachedUserPosts);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                setPosts(response.data);
                setCachedData(`user-posts-${userId}`, response.data);
                setLoading(false);
            } catch (e) {
                setError(e);
                setLoading(false);
            }
        };

        if (!cachedUserPosts) {
            fetchUserPosts();
        }
    }, [cachedUserPosts, setCachedData, userId]);

    return { posts, loading, error };
};

export default useFetchUserPosts;
