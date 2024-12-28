import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getSearchResults } from "@/lib/apis/products";
import { ProductCard } from "@/components/product/ProductCard";
import { PaginatedResponse, Product } from "@/lib/types";
import SearchListPagination from "@/components/product/SearchListPagination";

interface SearchResultsProps {
  searchParams: Promise<{
    keyword: string;
    page: string;
  }>;
}

const SearchPage: React.FC<SearchResultsProps> = async ({ searchParams }) => {
  const { page, keyword } = await searchParams;
  const currentPage = Number(page) || 1;
  const searchResults = keyword
    ? await getSearchResults(keyword, currentPage)
    : ([] as unknown as PaginatedResponse<Product>);

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="px-12 mb-20" mt={2}>
        <Typography
          variant="h6"
          sx={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          {" "}
          Search Results for &ldquo;{keyword}&rdquo;
        </Typography>
        <Grid container sx={{ mb: 3 }} spacing={2}>
          {searchResults.data.length > 0 ? (
            searchResults?.data?.map((product) => (
              <Grid item xs={6} md={4} lg={2} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No results found.</Typography>
          )}
        </Grid>
        <SearchListPagination
          currentPage={searchResults.meta.current_page}
          pageCount={searchResults.meta.last_page}
          keyword={keyword}
        />
      </Box>
    </Box>
  );
};

export default SearchPage;
