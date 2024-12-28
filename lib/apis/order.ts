import { Cart, Checkout, Order, PaginatedResponse } from "../types";
import api, { CustomAxiosRequestConfig } from "./api";

export async function getCart(): Promise<Cart> {
  try {
    const response = await api.get<Cart>(`/cart`, {
      requiresAuth: true,
    } as CustomAxiosRequestConfig);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching cart getCart:", error);
    throw error;
  }
}

export async function getCheckout(): Promise<Checkout> {
  try {
    const response = await api.get<Checkout>(`/checkout`, {
      requiresAuth: true,
    } as CustomAxiosRequestConfig);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching cart getCheckout:", error);
    throw error;
  }
}

export async function getOrders(): Promise<PaginatedResponse<Order>> {
  try {
    const response = await api.get<PaginatedResponse<Order>>(
      `/orders/history`,
      {
        requiresAuth: true,
      } as CustomAxiosRequestConfig
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching cart getOrders:", error);
    throw error;
  }
}
