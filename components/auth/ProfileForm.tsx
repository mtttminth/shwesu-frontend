"use client";

import React, { useState } from "react";
import { TextField, Box, Button, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { profileUpdate } from "@/lib/auth/authService";
import { Profile } from "@/lib/types";

const profileSchema = z
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
    address: z.string().optional().nullable(), // Added address field
    password: z
      .string()
      .min(6, { message: "Password must be between 6 to 20 characters" })
      .max(20, { message: "Password must be between 6 to 20 characters" })
      .optional()
      .nullable(),
    password_confirmation: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      if (data.password || data.password_confirmation) {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["password_confirmation"], // path of error
    }
  );

export type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileForm: React.FC<{ initialData: Profile }> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name || "",
      phone: initialData.phone || "",
      address: initialData.address || "", // Added default value for address
      password: null,
      password_confirmation: null,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      const { name, phone, password, password_confirmation, address } = data;

      await profileUpdate(
        name,
        phone,
        password,
        password_confirmation,
        address
      );
      setSnackbarOpen(true);
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const apiErrors = error.response.data.errors;
        for (const key in apiErrors) {
          setError(key as keyof ProfileFormData, {
            type: "server",
            message: apiErrors[key][0],
          });
        }
      } else {
        console.error(
          "An unexpected error occurred during profile update:",
          error
        );
        setError("name", {
          type: "server",
          message: "An unexpected error occurred during profile update.",
        });
      }
    } finally {
      setLoading(false);
    }
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
    <Box>
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
        <TextField // Added TextField for address
          label="Address"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
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
            disabled={loading}
          >
            {loading ? "Processing..." : "Update Profile"}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;
