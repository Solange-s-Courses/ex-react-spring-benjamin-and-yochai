import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fatalError, setFatalError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setFatalError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    const error = new Error(errorData.message || 'Failed to fetch data');
                    error.status = response.status;
                    throw error;
                }
                const result = await response.json();
                setData(result);
                if (!result || result.length === 0) {
                    throw new Error('something went wrong, please try again later.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setFatalError(error.message);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, fatalError: fatalError, setFatalError: setFatalError };
} 