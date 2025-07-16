"use client";

import {
  allItemsAtom,
  selectedStatusesAtom,
  selectedUfsAtom,
} from "@/store/atoms";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { useMemo } from "react";

export function FilterPanel() {
  const [selectedStatuses, setSelectedStatuses] = useAtom(selectedStatusesAtom);
  const [selectedUfs, setSelectedUfs] = useAtom(selectedUfsAtom);
  const [allItems] = useAtom(allItemsAtom);

  const availableUfs = useMemo(
    () => [...new Set(allItems.map((item) => item.uf))].sort(),
    [allItems]
  );
  const availableStatuses = useMemo(
    () => [...new Set(allItems.map((item) => item.status))].sort(),
    [allItems]
  );

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleUfChange = (event: any) => {
    const value = event.target.value;
    setSelectedUfs(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={2}
      my={2}
    >
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Filtrar por Status
        </Typography>
        <FormGroup>
          {availableStatuses.map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={selectedStatuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                />
              }
              label={status}
            />
          ))}
        </FormGroup>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Filtrar por Estado (UF)
        </Typography>
        <InputLabel id="uf-select-label">UF</InputLabel>
        <Select
          labelId="uf-select-label"
          multiple
          value={selectedUfs}
          onChange={handleUfChange}
          fullWidth
        >
          {availableUfs.map((uf) => (
            <MenuItem key={uf} value={uf}>
              {uf}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}
