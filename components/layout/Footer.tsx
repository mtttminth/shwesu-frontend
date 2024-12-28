import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <Box className="bg-black py-4">
      <Typography variant="body2" sx={{ color: "#ffffff" }} align="center">
        {"Copyright © "}
        {new Date().getFullYear()}{" "}
        <Link color="inherit" href="">
          Shwe Su. All rights reserved.
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
