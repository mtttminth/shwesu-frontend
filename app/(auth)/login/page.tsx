"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  TextField,
  Box,
  Button,
  Link as MUILink,
  Typography,
} from "@mui/material";
import { loginUser } from "@/lib/auth/authService";
import { useRouter } from "next/navigation";
import { Card, Snackbar, Alert } from "@mui/material";
import Logo from "@/components/Logo";
import Link from "next/link";

const loginSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{7,9}$/, "The phone field must be a valid number.")
    .trim(),
  password: z
    .string()
    .min(6, { message: "Password must be between 6 to 20 characters" })
    .max(20, { message: "Password must be between 6 to 20 characters" })
    .trim(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const { phone, password } = data;

      await loginUser(phone, password);
      setSnackbarMessage("Logged in");
      setSnackbarOpen(true);
      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const apiErrors = error.response.data.errors;
        //set errors for each field
        for (const key in apiErrors) {
          setError(key as keyof LoginFormData, {
            type: "server",
            message: apiErrors[key][0],
          });
        }
      } else {
        console.error(
          "An unexpected error occurred during registration:",
          error
        );
        setError("phone", {
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
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
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
              disabled={loading}
            >
              {loading ? "Processing..." : "Login"}
            </Button>
          </Box>
        </form>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <MUILink component={Link} href="/register">
            Register now
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
