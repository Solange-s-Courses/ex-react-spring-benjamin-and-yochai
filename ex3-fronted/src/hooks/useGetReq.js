import { useState, useEffect } from 'react';
import axios from "axios";

/**
 * useGetReq Hook - Custom hook for making GET requests
 * 
 * This hook provides a reusable way to:
 * - Make GET requests to specified URLs
 * - Handle loading states
 * - Manage error states
 * - Trigger refetches when needed
 * - Return data in a consistent format
 * 
 * @returns {Object} Object containing data, loading state, and error handling
 * @param {string} url - The URL to fetch data from
 * @param {any} trigger - Value that triggers a refetch when changed
 */
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