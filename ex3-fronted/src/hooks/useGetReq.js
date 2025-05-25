import { useState, useEffect } from 'react';
import axios from "axios";

export function useGetReq(url, trigger) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fatalError, setFatalError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setFatalError(null);
            try {
                const response = await axios.get(url);
                setData(response.data);

            } catch (error) {
                setFatalError('something went wrong, please try again later');
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, trigger]);

    return { data, isLoading, fatalError: fatalError, setFatalError: setFatalError };
} 