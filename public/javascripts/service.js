const BASE_URL = 'http://localhost:3000';

export const fetchData = async(endpoint, method, data) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : undefined
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        return response.json();
    } catch (error) {
        console.error('API Request Error:', error.message);
        throw error;
    }
};