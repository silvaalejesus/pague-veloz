"use client";

import {
  allItemsAtom,
  paginatedItemsAtom,
  searchQueryAtom,
} from "@/store/atoms";
import { ICorretora } from "@/types";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { CorretoraCard } from "../Corretora/CorretoraCard";
import { FilterPanel } from "../FilterPanel";
import { PaginationControls } from "../PaginationControls";
import { SearchInput } from "../SearchInput";

interface ItemsListProps {
  initialItems: ICorretora[] | null;
}

export function ItemsList({ initialItems }: ItemsListProps) {
  const setAllItems = useSetAtom(allItemsAtom);
  const paginatedItems = useAtomValue(paginatedItemsAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const [isLoading, setIsLoading] = useState(true);
  const HEADER_HEIGHT = 70;
  useEffect(() => {
    setIsLoading(true);
    if (initialItems) {
      setAllItems(initialItems);
      setIsLoading(false);
    }
  }, [initialItems, setAllItems]);

  if (!initialItems) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Ocorreu um Erro</AlertTitle>
          Não foi possível carregar os dados iniciais do servidor.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight={`calc(100vh - ${HEADER_HEIGHT}px)`}
    >
      <Box p={2} flex="1">
        <SearchInput isLoading={isLoading} />
        <FilterPanel />
        {isLoading && (
          <Box display="flex" flexDirection="column" alignItems="center" p={4}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Carregando corretoras...
            </Typography>
          </Box>
        )}
        {paginatedItems.length > 0 ? (
          <>
            <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
              {paginatedItems.map((item) => (
                <Grid key={item.cnpj} size={{ xs: 12, sm: 6, md: 4 }}>
                  <CorretoraCard corretora={item} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography textAlign="center" p={4} color="text.secondary">
            {searchQuery && "Nenhum resultado encontrado para a sua busca."}
          </Typography>
        )}
      </Box>

      <Box component="footer" py={2} textAlign="center" marginTop="auto">
        <PaginationControls />
      </Box>
    </Box>
  );
}
