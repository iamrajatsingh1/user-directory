// useFetchUsers.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCache } from '../context/CacheContext';

const useFetchUsers = () => {
  const { getCachedData, setCachedData } = useCache();

  const cachedUsers = getCachedData('users');
  const [users, setUsers] = useState(cachedUsers || []);
  const [loading, setLoading] = useState(!cachedUsers);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setCachedData('users', response.data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    if (!cachedUsers) {
      fetchUsers();
    }
  }, [cachedUsers, setCachedData]);

  return { users, loading, error };
};

export default useFetchUsers;
