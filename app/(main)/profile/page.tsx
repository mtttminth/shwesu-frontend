import React from "react";
import { Box, Grid } from "@mui/material";
import { getProfile } from "@/lib/auth/authService";
import ProfileForm from "@/components/auth/ProfileForm";

export default async function ProfilePage() {
  const data = await getProfile();
  console.log(data);
  return (
    <Box sx={{ width: "100%" }}>
      <Box className="px-12 mt-8 mb-12">
        <Grid>
          <Box className="content-center items-center mb-8">
            <h1 className="text-lg">Profile</h1>
          </Box>
        </Grid>
        <Grid container>
          <Grid xs={12} md={4}>
            <ProfileForm initialData={data} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
