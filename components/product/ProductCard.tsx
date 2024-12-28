"use client";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/services";
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box
      key={product.id}
      component="div"
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "10px",
      }}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="grid place-items-center pb-2 relative">
          <img
            src={product.image_url || "/default-product.jpg"}
            alt="name"
            className="min-h-64 max-h-64 max-w-full"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="truncate text-slate-900 text-sm leading-7">
            {product.name}
          </p>
          <IconButton color="primary">
            <FaShoppingCart />
          </IconButton>
        </div>
        {product.unit_price !== product.discounted_price ? (
          <p className="text-sm text-gray-500 leading-10">
            <span className="text-xs text-red-500 pr-2 line-through">
              {formatPrice(product.unit_price)}
            </span>
            {formatPrice(product.discounted_price)} MMK
          </p>
        ) : (
          <p className="text-sm text-gray-500 leading-10">
            {formatPrice(product.discounted_price)} MMK
          </p>
        )}
      </Link>
    </Box>
  );
};
