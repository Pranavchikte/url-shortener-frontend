// lib/auth.ts
import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export const registerUser = async (credentials: AuthCredentials) => {
    try {
        // The register endpoint expects JSON, so this is fine.
        const response = await apiClient.post("/auth/register", credentials);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || "Registration failed.");
        }
        throw new Error("Registration failed. Please try again.");
    }
};

/**
 * Logs in a user and returns a JWT.
 * @param credentials - The user's email and password.
 */
export const loginUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    // The /auth/token endpoint expects form data, not JSON.
    // We create a URLSearchParams object to format the data correctly.
    const params = new URLSearchParams();
    params.append('username', credentials.email); // The backend expects 'username' for the email field
    params.append('password', credentials.password);

    try {
        const response = await apiClient.post("/auth/token", params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || "Login failed.");
        }
        throw new Error("Login failed. Please try again.");
    }
};