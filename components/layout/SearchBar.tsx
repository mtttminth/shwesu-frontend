"use client";

import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?keyword=${searchTerm}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      placeholder="Search with product name..."
      variant="outlined"
      size="small"
      sx={{ width: "100%", maxWidth: 500 }}
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={handleSearch}
      InputProps={{
        // Use InputProps for endAdornment
        endAdornment: (
          <InputAdornment position="end">
            <FaSearch />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
