import { Cart, Checkout, Order, PaginatedResponse } from "../types";
import api from "./api";

export async function getCart(): Promise<Cart> {
  try {
    const response = await api.get<Cart>(`/cart`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function getCheckout(): Promise<Checkout> {
  try {
    const response = await api.get<Checkout>(`/checkout`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function getOrders(): Promise<PaginatedResponse<Order>> {
  try {
    const response = await api.get<PaginatedResponse<Order>>(`/orders/history`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}
