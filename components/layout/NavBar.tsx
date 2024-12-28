"use client";
import { FC, useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Drawer, List } from "@mui/material";
import { MdOutlineMenu } from "react-icons/md";
import { NavItem, Category } from "@/lib/types";
import NavLink from "./NavLink";
import DrawerNavLink from "./DrawerNavLink";

interface NavBarProps {
  navItems: NavItem[];
}

const NavBar: FC<NavBarProps> = ({ navItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerCategoryOpen, setDrawerCategoryOpen] = useState(false);
  const categories = (navItems.find((item) => item.label === "Categories")
    ?.dropdownItems || []) as Category[];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerCategoryClick = () => {
    setDrawerCategoryOpen(!drawerCategoryOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MdOutlineMenu />
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              justifyContent: "space-between", // Added for spacing
            }}
          >
            <Box sx={{ display: "flex" }}>
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} categories={categories} />
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 300,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <DrawerNavLink
              key={item.label}
              item={item}
              categories={categories}
              drawerCategoryOpen={drawerCategoryOpen}
              handleDrawerCategoryClick={handleDrawerCategoryClick}
            />
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
