"use client";
import React, { useCallback, useEffect } from "react";
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import Link from "next/link";
import NumberInput from "@/components/product/NumberInput";
import { FaTrash } from "react-icons/fa";
import { useCartStore } from "@/stores/order/cartStore"; // Import the Zustand store
import { formatPrice } from "@/lib/services";
import Image from "next/image";
import { AxiosError } from "axios";

export default function CartPage() {
  const {
    cart,
    loading,
    error,
    fetchCart,
    increaseQuantity,
    decreaseQuantity,
    removeVariant,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = useCallback(
    (variantId: number, newQuantity: number | null) => {
      if (newQuantity === null) {
        return;
      }
      const variant = cart?.variants.find((v) => v.id === variantId);
      if (variant) {
        if (newQuantity > variant.quantity) {
          increaseQuantity(variantId);
        } else if (newQuantity < variant.quantity) {
          decreaseQuantity(variantId);
        }
      }
    },
    [cart?.variants, decreaseQuantity, increaseQuantity]
  );

  const handleRemoveItem = (variantId: number) => {
    removeVariant(variantId);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="md:px-12 sm:px-2 mt-12 mb-12">
        <Grid>
          <Box className="content-center items-center mb-8">
            <Typography variant="h5">Your Cart</Typography>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={12}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : error instanceof AxiosError &&
              error.response?.status === 404 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle1">Your cart is empty.</Typography>
                <Button component={Link} href="/" variant="contained">
                  Continue Shopping
                </Button>
              </Box>
            ) : error instanceof AxiosError && (error.response?.data as any) ? (
              <Alert severity="error">
                Error fetching cart:{(error.response?.data as any)?.message}
              </Alert>
            ) : !cart || cart.variants.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle1">Your cart is empty.</Typography>
                <Button component={Link} href="/" variant="contained">
                  Continue Shopping
                </Button>
              </Box>
            ) : (
              <TableContainer>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Subtotal</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.variants?.map((variant) => (
                      <TableRow
                        key={variant.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box
                            sx={{ width: 80, height: 80, position: "relative" }}
                          >
                            <Image
                              src={variant.image_url}
                              alt={variant.name}
                              fill
                              sizes="(max-width: 600px) 40vw, 80px"
                              style={{ objectFit: "contain" }}
                              className="h-auto sm:max-w-20"
                            />
                          </Box>
                          <Typography
                            sx={{ fontSize: "0.8rem", marginTop: "0.5rem" }}
                          >
                            {variant.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <NumberInput
                            aria-label="Quantity Input"
                            min={1}
                            max={variant.stock}
                            defaultValue={variant.quantity}
                            onChange={(event, newValue) => {
                              handleQuantityChange(variant.id, newValue);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {formatPrice(variant.discounted_price)} MMK
                        </TableCell>
                        <TableCell>
                          {formatPrice(variant.subtotal)} MMK
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            sx={{ padding: 0 }}
                            onClick={() => handleRemoveItem(variant.id)}
                          >
                            <FaTrash
                              className="text-red-600"
                              style={{ fontSize: "1rem" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={2} />
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>
                        {formatPrice(cart?.total_price)} MMK
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
          {(cart?.variants ?? []).length > 0 && (
            <Grid
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button component={Link} href="/checkout" variant="contained">
                Proceed to Checkout
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
