const API_URL = import.meta.env.VITE_LOCAL_API_URL;

const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_URL}${endpoint}`;
    
    console.log(`Making request to: ${url}`);

    // Set up headers for the request
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            // For 204 No Content responses, return null
            if (response.status === 204) {
                return null as T;
            }

            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
        }

        // For 204 No Content responses, return null
        if (response.status === 204) {
            return null as T;
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

export default apiRequest;