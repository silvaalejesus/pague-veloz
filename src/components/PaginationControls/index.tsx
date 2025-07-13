"use client";

import {
  currentPageAtom,
  filteredItemsAtom,
  itemsPerPageAtom,
} from "@/store/atoms";
import { Box, Pagination } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";

export const PaginationControls = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const itemsPerPage = useAtomValue(itemsPerPageAtom);
  const filteredItems = useAtomValue(filteredItemsAtom);

  if (!filteredItems || filteredItems.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (totalPages <= 1) return null;

  return (
    <Box
      style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};
