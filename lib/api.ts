
import axios from "axios";

export interface ShortenedURL {
    short_code: string;
    short_url: string;
    original_url: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Sends a long URL to the backend to be shortened.
 * @param originalUrl - The URL to shorten.
 * @returns A promise that resolves to the shortened URL data.
 */

const apiClient = axios.create({
    baseURL: API_URL,
});

export const shortenUrl = async (originalUrl: string): Promise<ShortenedURL> => {
    try {
        const response = await apiClient.post("/api/shorten", {
            original_url: originalUrl,
        });
        return response.data;
    } catch (error) {
        // Log the error for debugging and re-throw it to be handled by the component
        console.error("Error shortening URL:", error);
        throw new Error("Failed to shorten URL. Please try again.");
    }
};