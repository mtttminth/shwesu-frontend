export interface NavItem {
  label: string;
  href?: string;
  dropdownItems?: Category[];
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  slug: string;
  name: string;
  image_url?: string;
}

export interface Banner {
  id: number;
  name: string;
  image_url: string[];
}

export interface ProductVariantValue {
  id: number;
  value: string;
  attribute_id?: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku: string;
  unit_price: number;
  stock: number;
  values: ProductVariantValue[];
}

export interface ProductAttribute {
  id: number;
  name: string;
  slug: string;
  values: ProductVariantValue[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  unit_price: number;
  discounted_price: number;
  image_url: string;
}

export interface ProductDetail extends Product {
  images: string[];
  description: string;
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  subcategory: {
    id: number;
    name: string;
    slug: string;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  cover_url?: string;
  products?: Product[];
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface CartItem {
  id: number;
  name: string;
  sku: string;
  unit_price: number;
  discounted_price: number;
  stock: number;
  image_url: string;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  variants: CartItem[];
  total_price: number;
}

export interface Checkout {
  variants: CartItem[];
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  total_price: number;
  item_count: number;
  order_status: string;
  created_at: string;
  variants: CartItem[];
}

export interface Profile {
  name: string;
  phone: string | null;
  address: string | null;
}
