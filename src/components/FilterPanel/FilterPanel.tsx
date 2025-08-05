"use client";

import {
  CvmFilter,
  SearchInput,
  StatusFilter,
  UfFilter,
} from "@/components/FilterPanel";
import {
  currentPageAtom,
  cvmCodeAtom,
  searchQueryAtom,
  selectedStatusesAtom,
  selectedUfsAtom,
} from "@/store/atoms";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

interface ItemsListProps {
  isLoading: boolean;
}

export const FilterPanel = ({ isLoading }: ItemsListProps) => {
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const setSelectedUfs = useSetAtom(selectedUfsAtom);
  const setSelectedStatuses = useSetAtom(selectedStatusesAtom);
  const setCvmCode = useSetAtom(cvmCodeAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const selectedUfs = useAtomValue(selectedUfsAtom);
  const selectedStatuses = useAtomValue(selectedStatusesAtom);
  const cvmCode = useAtomValue(cvmCodeAtom);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedUfs([]);
    setSelectedStatuses([]);
    setCvmCode("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedUfs, selectedStatuses, cvmCode, setCurrentPage]);

  return (
    <Box sx={{ border: "1px solid #ddd", p: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <SearchInput isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CvmFilter isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <UfFilter isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <StatusFilter />
        </Grid>
        <Grid
          size={{ xs: 12, md: 3 }}
          container
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button variant="outlined" onClick={handleClearFilters}>
            Limpar Filtros
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
