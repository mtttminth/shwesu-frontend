"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { Order } from "@/lib/types";
import { formatPrice } from "@/lib/services";
import api from "@/lib/apis/api";

interface OrderDetailProps {
  order: Pick<
    Order,
    "id" | "order_number" | "created_at" | "order_status" | "total_price"
  >;
}

export default function OrderDetail({ order }: OrderDetailProps) {
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExpand = async () => {
    setOpen(!open);
    if (!open && !orderDetails) {
      setLoading(true);
      try {
        const response = await api.get(`/orders/${order.id}`);
        setOrderDetails(response.data.data);
      } catch (err: any) {
        console.error("Error fetching order details:", err);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpand}
          >
            {open ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.order_number}
        </TableCell>
        <TableCell align="right">
          {new Intl.DateTimeFormat("my-MM", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(order.created_at))}
        </TableCell>
        <TableCell align="right">{order.order_status}</TableCell>
        <TableCell align="right">
          {formatPrice(order.total_price)} MMK
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Detail
              </Typography>
              {loading && <CircularProgress />}
              {error && <Typography color="error">{error}</Typography>}
              {orderDetails && (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right">Total price (MMK)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetails?.variants?.map((variant) => (
                      <TableRow key={variant.sku}>
                        <TableCell component="th" scope="row">
                          {variant.name}
                        </TableCell>
                        <TableCell>{variant.quantity}</TableCell>
                        <TableCell align="right">
                          {formatPrice(variant.discounted_price)}
                        </TableCell>
                        <TableCell align="right">
                          {formatPrice(variant.subtotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
