"use client";

import { allItemsAtom, selectedUfsAtom } from "@/store/atoms";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";

interface ItemsListProps {
  isLoading: boolean;
}

export const UfFilter = ({ isLoading }: ItemsListProps) => {
  const [selectedUfs, setSelectedUfs] = useAtom(selectedUfsAtom);
  const [allItems] = useAtom(allItemsAtom);
  const [openSelect, setOpenSelect] = useState(false);

  const availableUfs = useMemo(
    () => [...new Set(allItems.map((item) => item.uf).filter(Boolean))].sort(),
    [allItems]
  );

  const handleUfChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedUfs(typeof value === "string" ? value.split(",") : value);
    setOpenSelect(false);
  };

  return (
    <FormControl fullWidth variant="outlined" disabled={isLoading}>
      <InputLabel id="uf-select-label">Filtrar por UF</InputLabel>
      <Select
        labelId="uf-select-label"
        label="Filtrar por UF"
        multiple
        value={selectedUfs}
        onChange={handleUfChange}
        open={openSelect}
        onClose={() => setOpenSelect(false)}
        onOpen={() => setOpenSelect(true)}
        data-testid="uf-select"
      >
        {availableUfs.map((uf) => (
          <MenuItem key={uf} value={uf}>
            {uf}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
