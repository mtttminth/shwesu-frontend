// components/order/OrderForm.tsx
"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/apis/api"; // Import your api instance
import { useRouter } from "next/navigation";

const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  note: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

const OrderForm: React.FC = () => {
  const { register, handleSubmit } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (data: OrderFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await api.post("orders/order", data);
      console.log("Order placed successfully:", response.data);
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push("/orders");
      }, 2000); // Redirect after 2 seconds
    } catch (error: any) {
      console.error("Error placing order:", error);
      setSubmitError("Failed to place order. Please try again.");
      // Optionally handle error (e.g., display error message to the user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
      <TextField
        size="medium"
        variant="filled"
        label="အမည်"
        {...register("name")}
        sx={{ width: "100%", marginTop: "1rem" }}
        error={!!submitError}
        helperText={submitError}
      />
      <TextField
        size="medium"
        variant="filled"
        label="ဖုန်းနံပါတ််"
        {...register("phone")}
        sx={{ width: "100%", marginTop: "1rem" }}
      />
      <TextField
        size="medium"
        variant="filled"
        label="လက်ခံယူမည့်လိပ်စာ"
        multiline
        rows={4}
        {...register("address")}
        sx={{ width: "100%", marginTop: "1rem" }}
      />
      <TextField
        size="medium"
        variant="filled"
        label="ပြောကြားလိုသောမှတ်စု"
        multiline
        rows={4}
        {...register("note")}
        sx={{ width: "100%", marginTop: "1rem" }}
      />
      <Button
        size="medium"
        type="submit"
        variant="contained"
        tabIndex={-1}
        sx={{
          width: "100%",
          mt: 2,
          maxWidth: "20rem",
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderForm;
