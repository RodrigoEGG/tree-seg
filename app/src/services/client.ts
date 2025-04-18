const API_URL = import.meta.env.VITE_LOCAL_API_URL;

const apiRequest = async <T>(endpoint: string, token?: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_URL}${endpoint}`;

    const headers: HeadersInit = {
        'Accept': 'application/json',
        ...(options.body instanceof URLSearchParams ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
        }

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