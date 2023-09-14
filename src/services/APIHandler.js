import { useState } from 'react';
import axios from 'axios';


export function useApiHandler() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiHandler = async ({path, page = 1}) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        const params = {
            key: '64be55ab7ca3444fa2b80754b9ee90c4'
        };

        try {
            setLoading(true);
            const response = await axios.get({
                baseURL: 'https://api.rawg.io/api',
                url: path,
                headers: headers,
                params: params
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    return [apiHandler, loading, error];
}