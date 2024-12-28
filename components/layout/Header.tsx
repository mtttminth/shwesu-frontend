"use client";
import { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Button, // Import Button
} from "@mui/material";
import Link from "next/link";
import { HiUserCircle } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import SearchBar from "./SearchBar";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/order/cartStore";
import { deleteAccessToken, getAccessToken } from "@/lib/auth/tokenService";

const Header: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const fetchItemCount = useCartStore((state) => state.fetchItemCount);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();

  const checkAuthStatus = useCallback(async () => {
    if (typeof window !== "undefined") {
      const token = await getAccessToken();
      return !!token;
    }
    return false;
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("checking login");
      const isLoggedIn = await checkAuthStatus();
      if (isLoggedIn) {
        console.log("logged in");
        fetchItemCount();
      }
      setAuth(isLoggedIn);
    };
    checkAuth();
  }, [fetchItemCount, checkAuthStatus]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(async () => {
    await deleteAccessToken();
    setAuth(false);
    handleClose();
    setSnackbarMessage("Logged out");
    setSnackbarOpen(true);
    router.push("/");
  }, [router]);

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
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#E9ECEF",
        color: "text.primary",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "space-between" },
            padding: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center logo on small screens
              marginBottom: { xs: 1, md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Link href="/">
              <Logo width={100} height={50} />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              maxWidth: { md: "600px" },
              minWidth: { xs: "100%", md: "600px" },
            }}
          >
            <SearchBar />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Align items vertically in the Box
              gap: { xs: 1, sm: 2 },
            }}
          >
            <IconButton
              aria-label="cart"
              sx={{ fontSize: { xs: 30, sm: 20, md: 32 } }}
            >
              <Link href="/cart" style={{ color: "inherit" }}>
                <IoMdCart />
              </Link>
              {cartItemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px 6px",
                    fontSize: "12px",
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </IconButton>
            {auth ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <HiUserCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/orders")}>
                    Order History
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </div>
            ) : (
              <Box>
                <Button variant="contained" component={Link} href="/login">
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
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
    </AppBar>
  );
};

export default Header;
