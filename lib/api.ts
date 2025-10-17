import axios from "axios";
import toast from "react-hot-toast";

// FIX: Added 'created_at' to our data blueprint.
export interface ShortenedURL {
    short_code: string;
    short_url: string;
    original_url: string;
    is_active: boolean;
    created_at: string; // The date will come as a string from the JSON response
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
    baseURL: API_URL,
});

// Interceptor to automatically add the token to every request.
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to handle responses, specifically for token expiration.
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            toast.error("Your session has expired. Please log in again.");
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const shortenUrl = async (originalUrl: string): Promise<ShortenedURL> => {
    try {
        const response = await apiClient.post("/api/shorten", {
            original_url: originalUrl,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
            throw new Error(error.response?.data.detail || "Failed to shorten URL.");
        }
        return Promise.reject(error);
    }
};

export const getUserLinks = async (): Promise<ShortenedURL[]> => {
    try {
        const response = await apiClient.get("/api/me/links");
        return response.data;
    } catch (error) {
        console.error("Error fetching user links:", error);
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
            throw new Error(error.response?.data.detail || "Failed to fetch links.");
        }
        return Promise.reject(error);
    }
};

export const getRecentUserLinks = async (): Promise<ShortenedURL[]> => {
    try {
        const response = await apiClient.get("/api/me/links/recent");
        return response.data;
    } catch (error) {
        console.error("Error fetching recent user links:", error);
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
            throw new Error(error.response?.data.detail || "Failed to fetch recent links.");
        }
        return Promise.reject(error);
    }
};

export const toggleLinkStatus = async (shortCode: string): Promise<ShortenedURL> => {
    try {
        const response = await apiClient.patch(`/api/links/${shortCode}`);
        return response.data;
    } catch (error) {
        console.error("Error toggling link status:", error);
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
            throw new Error(error.response?.data.detail || "Failed to update link status.");
        }
        return Promise.reject(error);
    }
};

export const deleteLink = async (shortCode: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/links/${shortCode}`);
    } catch (error) {
        console.error("Error deleting link:", error);
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
            throw new Error(error.response?.data.detail || "Failed to delete link.");
        }
        return Promise.reject(error);
    }
};