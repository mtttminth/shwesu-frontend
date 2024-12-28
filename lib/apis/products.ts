import { getPerPage } from "../services";
import api from "./api";
import { Product, PaginatedResponse, ProductDetail } from "@/lib/types";

export async function getProducts(
  slug: string,
  page: number = 1,
  endpoint: string = "subcategories"
): Promise<PaginatedResponse<Product>> {
  try {
    const perPage = getPerPage();
    const response = await api.get<PaginatedResponse<Product>>(
      `/${endpoint}/${slug}/products?page=${page}&perPage=${perPage}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(slug: string): Promise<ProductDetail> {
  try {
    const response = await api.get<{ data: ProductDetail }>(
      `/products/${slug}`
    );
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function getSearchResults(
  keyword: string,
  page: number = 1
): Promise<PaginatedResponse<Product>> {
  try {
    const perPage = getPerPage();
    const response = await api.get<PaginatedResponse<Product>>(
      `/products/search?keyword=${keyword}&page=${page}&perPage=${perPage}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}
