import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { deleteAccessToken, getAccessToken } from "../auth/tokenService";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requiresAuth?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const customConfig = config as CustomAxiosRequestConfig;
    if (customConfig.requiresAuth) {
      const accessToken = await getAccessToken();
      if (accessToken) {
        customConfig.headers = {
          ...customConfig.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }
    return config as InternalAxiosRequestConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      deleteAccessToken();
      throw new Error("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default api;
