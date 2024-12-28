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
            className="h-auto max-w-full"
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
      {/* <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardActionArea component={Link} href={`/products/${product.slug}`}>
          <Box sx={{ position: "relative", paddingTop: "100%" }}>
            <Image
              src={product.image_url || "/default-product.jpg"}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                wordBreak: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: isDesktop ? undefined : 2,
                WebkitBoxOrient: "vertical",
                textAlign: "left",
              }}
            >
              {product.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: isDesktop ? "row" : "column",
                alignItems: isDesktop ? "center" : "flex-start",
                gap: { xs: 0, sm: 1 },
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  flexDirection: "row",
                }}
              >
                <Typography variant="body2">Ks</Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  {formatPrice(product.discounted_price)}
                </Typography>
              </Box>
              {product.unit_price !== product.discounted_price ? (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  {formatPrice(product.unit_price)}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    visibility: "hidden",
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  {formatPrice(product.unit_price)}
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card> */}
    </Box>
  );
};
