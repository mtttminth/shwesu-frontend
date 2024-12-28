"use client";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        py: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 4,
        color: "white",
      }}
    >
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default SectionHeader;
