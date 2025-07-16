"use client";

import { currentPageAtom, searchQueryAtom } from "@/store/atoms";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

interface SearchInputProps {
  isLoading: boolean;
}

export const SearchInput = ({ isLoading }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, setCurrentPage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Buscar por CNPJ, Nome Comercial ou Razão Social..."
      value={searchQuery}
      onChange={handleInputChange}
      disabled={isLoading}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      style={{ marginBottom: "16px" }}
    />
  );
};
