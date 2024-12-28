import axios, { AxiosError } from "axios";
import { deleteAccessToken, getAccessToken } from "../auth/tokenService";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
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

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
