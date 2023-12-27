// useFetchUserDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCache } from '../context/CacheContext';

const useFetchUserDetails = (userId) => {
  const { getCachedData, setCachedData } = useCache();

  const cachedUserDetails = getCachedData(`user-${userId}`);
  const [user, setUser] = useState(cachedUserDetails || {});
  const [loading, setLoading] = useState(!cachedUserDetails);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUser(response.data);
        setCachedData(`user-${userId}`, response.data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    if (!cachedUserDetails) {
      fetchUserDetails();
    }
  }, [cachedUserDetails, setCachedData, userId]);

  return { user, loading, error };
};

export default useFetchUserDetails;
