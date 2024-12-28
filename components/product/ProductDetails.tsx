"use client";

import Grid from "@mui/material/Grid2";
import NumberInput from "@/components/product/NumberInput";
import { FaCartPlus } from "react-icons/fa";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import { formatPrice } from "@/lib/services";
import ProductOptions from "@/components/product/ProductOptions";
import { ProductDetail, ProductVariant } from "@/lib/types";
import { useCallback, useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert
import { useCartStore } from "@/stores/order/cartStore";

interface ProductDetailsProps {
  product: ProductDetail;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >();
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCartStore();

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const transformImages = (images: string[]) => {
    return images.map((image) => ({
      original: image,
      thumbnail: image,
    }));
  };

  const galleryImages = transformImages(product.images);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      setSnackbarMessage("Please select a variant");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await addToCart({ variant_id: selectedVariant.id, quantity });
      setSnackbarMessage("Added to cart!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error: any) {
      setSnackbarMessage("Failed to add to cart");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error adding to cart:", error);
    }
  };

  const handleQuantityChange = (value: number | null) => {
    setQuantity(value === null ? 1 : value);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container sx={{ mb: 3, p: 1 }} spacing={2}>
      <ProductImageGallery items={galleryImages} />
      <Grid size={{ md: 12, lg: 6 }}>
        <h2 className="pt-3 text-xl font-bold lg:pt-0">{product.name}</h2>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {selectedVariant?.stock !== undefined ? (
            selectedVariant.stock > 0 ? (
              <span className="text-green-600">In Stock </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )
          ) : product.variants[0]?.stock > 0 ? (
            <span className="text-green-600">In Stock </span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>
        <p className="mt-5 font-bold">
          Category:{" "}
          <span className="font-normal">{product.subcategory.name}</span>
        </p>
        <p className="mt-4 text-2xl font-bold text-red-600">
          MMK{" "}
          {selectedVariant?.unit_price !== undefined
            ? formatPrice(selectedVariant.unit_price)
            : formatPrice(product.discounted_price)}{" "}
          {selectedVariant?.unit_price !== undefined && (
            <span className="text-xs text-gray-400 line-through">
              MMK {formatPrice(product.unit_price)}
            </span>
          )}
        </p>
        <div className="mt-6">
          <ProductOptions
            attributes={product.attributes}
            variants={product.variants}
            onVariantSelect={useCallback(
              (variant: ProductVariant | undefined) => {
                setSelectedVariant(variant);
              },
              []
            )}
          />
        </div>
        <div className="mt-6">
          <NumberInput
            aria-label="Quantity Input"
            min={1}
            max={99}
            value={quantity}
            onChange={(event, value) => {
              handleQuantityChange(value);
            }}
          />
        </div>
        <div className="mt-7">
          <Button
            onClick={handleAddToCart}
            variant="contained"
            startIcon={<FaCartPlus />}
            disabled={!selectedVariant}
            sx={{
              mt: 2,
              height: "3rem",
              width: "50%",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              transitionDuration: "100ms",
            }}
          >
            Add to cart
          </Button>
        </div>
      </Grid>
      <Grid mt={3}>
        <p className="pt-5 text-base leading-5 ext-slate-800">Description</p>
        <p className="pt-5 text-sm leading-8 text-gray-500">
          {product.description}
        </p>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProductDetails;
