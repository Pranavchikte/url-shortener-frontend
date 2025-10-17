// lib/api.ts

import axios from "axios";
import toast from "react-hot-toast";

export interface ShortenedURL {
    short_code: string;
    short_url: string;
    original_url: string;
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

// vvv THIS IS THE NEW PART vvv
// Interceptor to handle responses, specifically for token expiration.
apiClient.interceptors.response.use(
    // If the response is successful, just return it.
    (response) => {
        return response;
    },
    // If there's an error...
    (error) => {
        // Check if the error is a 401 Unauthorized.
        if (error.response && error.response.status === 401) {
            // Clear the expired token from storage.
            localStorage.removeItem('authToken');

            // Inform the user.
            toast.error("Your session has expired. Please log in again.");

            // Redirect to the login page.
            // We use window.location.href for a full page reload to clear all state.
            window.location.href = '/login';
        }

        // For any other error, just pass it along.
        return Promise.reject(error);
    }
);
// ^^^ END OF NEW PART ^^^

export const shortenUrl = async (originalUrl: string): Promise<ShortenedURL> => {
    try {
        const response = await apiClient.post("/api/shorten", {
            original_url: originalUrl,
        });
        return response.data;
    } catch (error) {
        // The interceptor will handle 401 errors, so we just re-throw for others.
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
            throw new Error(error.response?.data.detail || "Failed to shorten URL.");
        }
        // Avoid re-throwing the error if the interceptor is handling it.
        return Promise.reject(error);
    }
};