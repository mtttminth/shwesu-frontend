import Image from "next/image";
import React from "react";
import image from "@/public/images/logo.png";
import { Stack } from "@mui/material";

const Logo: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image src={image} alt="Logo" width={width} height={height} priority />
    </Stack>
  );
};

export default Logo;
