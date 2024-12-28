import { Box } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shwe Su Ecommerce",
  description: "Online Shopping Site for Fashion & Lifestyle. Brings you a variety of lifestyle products . Discover on-trend styles and best collections of clothing, footwear, accessories, and more",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        backgroundImage: "url('/images/auth/bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
