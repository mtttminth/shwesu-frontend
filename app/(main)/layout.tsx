import type { Metadata } from "next";
import { Box } from "@mui/material";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Category, Collection, NavItem } from "@/lib/types";
import { getCategories, getNavbarCollections } from "@/lib/apis/home";

export const metadata: Metadata = {
  title: "Shwe Su Ecommerce",
  description: "Online Shopping Site for Fashion & Lifestyle. Brings you a variety of lifestyle products . Discover on-trend styles and best collections of clothing, footwear, accessories, and more",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories: Category[] = await getCategories();
  const navbarCollections: Collection[] = await getNavbarCollections();

  const navItems: NavItem[] = [
    {
      label: "Categories",
      dropdownItems: categories,
    },
    ...navbarCollections.map((collection: Collection) => ({
      label: collection.name,
      href: `/collections/${collection.slug}`,
    })),
    {
      label: "Contact us",
      href: "/contact-us",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <NavBar navItems={navItems} />
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
