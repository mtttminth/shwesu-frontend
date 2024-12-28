"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  TextField,
  Box,
  Button,
  Typography,
  Link as MUILink,
  Snackbar,
  Alert,
} from "@mui/material";
import { registerUser } from "@/lib/auth/authService"; // Adjust path as needed
import { useRouter } from "next/navigation";
import { Card } from "@mui/material";
import Logo from "@/components/Logo";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name field is required" })
      .max(255, { message: "Name must be at most 255 characters" })
      .trim(),
    phone: z
      .string()
      .regex(/^09\d{7,9}$/, "The phone field must be a valid number.")
      .trim(),
    password: z
      .string()
      .min(6, { message: "Password must be between 6 to 20 characters" })
      .max(20, { message: "Password must be between 6 to 20 characters" })
      .trim(),
    password_confirmation: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .trim(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"], // path of error
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const { name, phone, password, password_confirmation } = data;

      await registerUser(name, phone, password, password_confirmation);
      setSnackbarMessage("Registered");
      setSnackbarOpen(true);
      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const apiErrors = error.response.data.errors;
        for (const key in apiErrors) {
          setError(key as keyof RegisterFormData, {
            type: "server",
            message: apiErrors[key][0],
          });
        }
      } else {
        console.error(
          "An unexpected error occurred during registration:",
          error
        );
        setError("name", {
          type: "server",
          message: "An unexpected error occurred during registration.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        border: "2px solid #FDCF09",
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          margin: "auto",
          padding: 2,
        }}
      >
        <Logo width={100} height={50} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            {...register("password_confirmation")}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
              disabled={loading}
            >
              {loading ? "Processing..." : "Register"}
            </Button>
          </Box>
        </form>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <MUILink component={Link} href="/login">
            Login here
          </MUILink>
        </Typography>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}
