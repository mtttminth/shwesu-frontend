import { Box, Grid, Typography } from "@mui/material";
import { getProducts } from "@/lib/apis/products";
import { ProductCard } from "@/components/product/ProductCard";
import Pagination from "@/components/product/Pagination";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const collectionName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const productData = await getProducts(slug, currentPage, "collections");

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="px-12 mb-20" mt={2}>
        <Typography
          variant="h6"
          sx={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          {collectionName}
        </Typography>
        <Grid container sx={{ mb: 3 }} spacing={2}>
          {productData.data.map((product) => (
            <Grid item xs={6} md={4} lg={2} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          currentPage={productData.meta.current_page}
          pageCount={productData.meta.last_page}
          slug={slug}
          endpoint="collections"
        />
      </Box>
    </Box>
  );
}
