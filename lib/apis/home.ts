import api from "./api";
import { Collection, Subcategory, Banner, Category } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get<{ data: Category[] }>("/categories");
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getNavbarCollections(): Promise<Collection[]> {
  try {
    const response = await api.get<{ data: Collection[] }>(
      "/navbar-collections"
    );
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching navbar collections:", error);
    throw error;
  }
}

export async function getBanners(): Promise<Banner[]> {
  try {
    const response = await api.get<{ data: Banner[] }>("/banners");
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching banners:", error);
    throw error;
  }
}

export async function getTopSubcategories(): Promise<Subcategory[]> {
  try {
    const response = await api.get<{ data: Subcategory[] }>(
      "/best-selling-subcategories"
    );
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching top subcategories:", error);
    throw error;
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await api.get<{ data: Collection[] }>("/collections");
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching collections:", error);
    throw error;
  }
}
