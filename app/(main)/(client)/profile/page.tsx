"use client";
import React from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { getProfile } from "@/lib/auth/authService";
import ProfileForm from "@/components/auth/ProfileForm";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const {
    isLoading,
    isError,
    data: profileData,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="px-12 mt-8 mb-12">
        <Grid>
          <Box className="content-center items-center mb-8">
            <h1 className="text-lg">Profile</h1>
          </Box>
        </Grid>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh", // Ensure some height to center content
            }}
          >
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography variant="h6" color="error">
              Error loading profile: {error?.message}
            </Typography>
          </Box>
        ) : (
          <Grid container>
            <Grid xs={12} md={4}>
              {profileData && <ProfileForm initialData={profileData} />}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
