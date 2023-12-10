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

export function updateLanguage() {
    const selectedLanguage = localStorage.getItem('lang') || 'en';
    const currentLanguage = getQueryParam('lang') || 'en';

    if (selectedLanguage !== currentLanguage) {
        window.location.href = window.location.pathname + '?lang=' + selectedLanguage;
    }
}

function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}