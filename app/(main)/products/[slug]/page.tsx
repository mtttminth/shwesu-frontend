// app/products/[slug]/page.tsx
import { Box } from "@mui/material";
import { getProduct } from "@/lib/apis/products";
import ProductDetails from "@/components/product/ProductDetails";
import { ProductDetail } from "@/lib/types";

interface ProductProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;
  const product: ProductDetail = await getProduct(slug);

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="md:px-12 sm:px-2 mt-12 mb-12">
        <ProductDetails product={product} />
      </Box>
    </Box>
  );
}
