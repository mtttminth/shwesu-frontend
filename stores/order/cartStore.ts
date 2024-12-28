import { create } from "zustand";
import { Cart } from "@/lib/types";
import api, { CustomAxiosRequestConfig } from "@/lib/apis/api";
import { AxiosError } from "axios";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | AxiosError | null;
  itemCount: number;
  fetchCart: () => Promise<void>;
  fetchItemCount: () => Promise<void>;
  increaseQuantity: (variantId: number) => Promise<void>;
  decreaseQuantity: (variantId: number) => Promise<void>;
  removeVariant: (variantId: number) => Promise<void>;
  addToCart: (payload: {
    variant_id: number;
    quantity: number;
  }) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,
  error: null,
  itemCount: 0,
  fetchCart: async () => {
    if (typeof window === "undefined") {
      return;
    }
    set({ loading: true, error: null });
    try {
      const response = await api.get<Cart>("/cart", {
        requiresAuth: true,
      } as CustomAxiosRequestConfig);
      set({ cart: response.data });
    } catch (error: any) {
      set({ error: error as AxiosError }); // Cast the error to AxiosError
    } finally {
      set({ loading: false });
    }
  },
  fetchItemCount: async () => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const response = await api.get<{ quantity: number }>(
        "/cart/variants/count",
        {
          requiresAuth: true,
        } as CustomAxiosRequestConfig
      );
      set({ itemCount: response.data.quantity });
    } catch (error: any) {
      console.error("Error fetching cart quantity fetchItemCount:", error);
      // Optionally handle error, e.g., set itemCount to 0
    }
  },
  increaseQuantity: async (variantId: number) => {
    set((state) => ({
      cart: state.cart
        ? {
            ...state.cart,
            variants: state.cart.variants.map((variant) =>
              variant.id === variantId
                ? { ...variant, quantity: variant.quantity + 1 }
                : variant
            ),
          }
        : null,
    }));
    try {
      const response = await api.post(
        `/cart/increase-quantity`,
        {
          variant_id: variantId,
        },
        {
          requiresAuth: true,
        } as CustomAxiosRequestConfig
      );
      set({ cart: response.data });
      if (typeof window !== "undefined") {
        get().fetchItemCount();
        get().fetchCart();
      }
    } catch (error: any) {
      set({ error: error as AxiosError });
      // Revert on error if needed, or handle error more gracefully
      set((state) => ({
        cart: state.cart
          ? {
              ...state.cart,
              variants: state.cart.variants.map((variant) =>
                variant.id === variantId
                  ? { ...variant, quantity: variant.quantity - 1 }
                  : variant
              ),
            }
          : null,
      }));
    }
  },
  decreaseQuantity: async (variantId: number) => {
    set((state) => ({
      cart: state.cart
        ? {
            ...state.cart,
            variants: state.cart.variants.map((variant) =>
              variant.id === variantId
                ? { ...variant, quantity: variant.quantity - 1 }
                : variant
            ),
          }
        : null,
    }));
    try {
      const response = await api.post(
        `/cart/decrease-quantity`,
        {
          variant_id: variantId,
        },
        {
          requiresAuth: true,
        } as CustomAxiosRequestConfig
      );
      set({ cart: response.data });
      if (typeof window !== "undefined") {
        get().fetchItemCount();
        get().fetchCart();
      }
    } catch (error: any) {
      set({ error: error as AxiosError });
      // Revert on error if needed, or handle error more gracefully
      set((state) => ({
        cart: state.cart
          ? {
              ...state.cart,
              variants: state.cart.variants.map((variant) =>
                variant.id === variantId
                  ? { ...variant, quantity: variant.quantity + 1 }
                  : variant
              ),
            }
          : null,
      }));
    }
  },
  removeVariant: async (variantId: number) => {
    try {
      await api.post(
        `/cart/remove-variant`,
        {
          variant_id: variantId,
        },
        {
          requiresAuth: true,
        } as CustomAxiosRequestConfig
      );
      if (typeof window !== "undefined") {
        get().fetchItemCount();
        get().fetchCart();
      }
    } catch (error: any) {
      set({ error: error as AxiosError });
    }
  },
  addToCart: async (payload: { variant_id: number; quantity: number }) => {
    try {
      await api.post("/cart/add-or-update", payload, {
        requiresAuth: true,
      } as CustomAxiosRequestConfig);
      if (typeof window !== "undefined") {
        get().fetchItemCount();
        get().fetchCart();
      }
    } catch (error: any) {
      set({ error: error as AxiosError });
      throw error; // Re-throw to allow component-level error handling if needed
    }
  },
}));
