import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCache } from '../context/CacheContext';

const useFetchCountries = () => {
    const { getCachedData, setCachedData } = useCache();

    const cachedCountries = getCachedData('countries');
    const [countries, setCountries] = useState(cachedCountries || []);
    const [loading, setLoading] = useState(!cachedCountries);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://worldtimeapi.org/api/timezone');
                setCountries(response.data);
                setCachedData('countries', response.data);
                setLoading(false);
            } catch (e) {
                setError(e);
                setLoading(false);
            }
        };

        if (!cachedCountries) {
            fetchCountries();
        }
    }, [cachedCountries, setCachedData]);

    return { countries, setCountries, loading, error };
};

export default useFetchCountries;
