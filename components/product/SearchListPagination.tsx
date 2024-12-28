"use client";

import { Pagination as MUIPagination, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  keyword: string;
}

export default function SearchListPagination({
  pageCount,
  currentPage,
  keyword,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/search?keyword=${keyword}&page=${value}`);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "3rem",
      }}
    >
      <MUIPagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
}
