import { Box, Typography, Button } from "@mui/material";
import { Collection } from "@/lib/types";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";

interface CollectionCarouselsProps {
  collections: Collection[];
}

const CollectionCarousels: React.FC<CollectionCarouselsProps> = ({
  collections,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      {collections.map((collection) => (
        <Box key={collection.id} sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {collection.name}
            </Typography>
            <Link href={`/collections/${collection.slug}`} passHref>
              <Button variant="contained" size="small">
                View All
              </Button>
            </Link>
          </Box>
          <ProductCarousel products={collection.products ?? []} />
        </Box>
      ))}
    </Box>
  );
};

export default CollectionCarousels;
