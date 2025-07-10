import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for flexibility
  timeout: 50000, // Set a timeout to handle long requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const controlers = {
  Auth: "api/Auth",
  Invoice: "api/Invoice",
  EndUser: "api/EndUser",
  Banner: "api/Banner",
  GiftCard: "api/GiftCard",
  Ranking: "api/Ranking",
  Level: "api/Level",
  Setting: "api/Setting",
  Survey: "api/Survey",
};

// Ensure you have js-cookie or a similar library installed

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add `companyId` header for all requests
    if (config.headers) {
      config.headers.set("companyId", "40"); // Use AxiosHeaders method
    }

    // Conditionally add Authorization header
    if (config.headers?.auth) {
      // Check if `auth` flag is present
      const token = cookies.get("token"); // Get the token from cookies
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    // Remove custom `auth` property to avoid sending it with the request
    if (config.headers) {
      delete config.headers.auth;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export const setupInterceptors = (redirectToLogin: () => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        redirectToLogin(); // 👈 اینجا صداش می‌زنیم
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
