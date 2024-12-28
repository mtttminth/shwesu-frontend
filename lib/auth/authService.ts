import api from "../apis/api";
import { Profile } from "../types";
import { setAccessToken, deleteAccessToken } from "./tokenService";

export const registerUser = async (
  name: string,
  phone: string,
  password: string,
  password_confirmation: string
) => {
  try {
    const response = await api.post("/register", {
      name,
      phone,
      password,
      password_confirmation,
    });
    const { token } = response.data;
    setAccessToken(token);
    return response.data.user;
  } catch (error: unknown) {
    throw error;
  }
};

export const loginUser = async (phone: string, password: string) => {
  try {
    const response = await api.post("/login", { phone, password });
    const { token } = response.data;
    setAccessToken(token);
    return response.data.user;
  } catch (error: unknown) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await api.post("/logout");
    deleteAccessToken();
  } catch (error) {
    console.error("Logout error:", error);
    deleteAccessToken();
  }
};

export async function getProfile(): Promise<Profile> {
  try {
    const response = await api.get<{ data: Profile }>(`/profile`);
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export const profileUpdate = async (
  name: string,
  phone: string,
  password: string | null | undefined,
  password_confirmation: string | null | undefined,
  address: string | null | undefined
) => {
  try {
    const response = await api.post("/profile/update", {
      _method: "put",
      name,
      phone,
      password: password ?? null,
      password_confirmation: password_confirmation ?? null,
      address,
    });

    if (
      (password !== null && password !== undefined) ||
      (password_confirmation !== null && password_confirmation !== undefined)
    ) {
      deleteAccessToken();
    }
    return response.data.user;
  } catch (error: unknown) {
    throw error;
  }
};
