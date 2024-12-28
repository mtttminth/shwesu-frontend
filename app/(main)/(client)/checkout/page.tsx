// app/checkout/page.tsx
"use client";
import React from "react";
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
  CircularProgress,
} from "@mui/material";
import { getCheckout } from "@/lib/apis/order";
import { formatPrice } from "@/lib/services";
import OrderForm from "@/components/order/OrderForm";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

export default function CheckoutPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["checkout"],
    queryFn: getCheckout,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="md:px-12 sm:px-2 mt-12 mb-12">
        <Grid>
          <Box className="content-center items-center mb-8">
            <h1 className="text-lg">Checkout</h1>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} mt={2} px={2}>
            <OrderForm />
          </Grid>
          <Grid xs={12} md={6} mt={2}>
            <TableContainer>
              <Table sx={{ minWidth: 250 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography variant="h6" color="error">
                          Error loading checkout information: {error?.message}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : data?.variants ? (
                    data.variants.map((variant) => (
                      <TableRow
                        key={variant.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              position: "relative",
                            }}
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
                        <TableCell>{variant.quantity}</TableCell>
                        <TableCell>
                          {formatPrice(variant.subtotal)} MMK
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography variant="h6">
                          No items in checkout
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {!isLoading && !isError && (
                    <TableRow>
                      <TableCell rowSpan={2} />
                      <TableCell>Total</TableCell>
                      <TableCell>
                        {data?.total_price ? formatPrice(data.total_price) : 0}{" "}
                        MMK
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
