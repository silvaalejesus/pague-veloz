"use client";

import { useCorretoras } from "@/hooks";
import { errorAtom, paginatedItemsAtom, searchQueryAtom } from "@/store/atoms";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { CorretoraCard } from "../Corretora/CorretoraCard";
import { PaginationControls } from "../PaginationControls";
import { SearchInput } from "../SearchInput";

export const ItemsList = () => {
  const { isLoading, refetch } = useCorretoras();
  const paginatedItems = useAtomValue(paginatedItemsAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const error = useAtomValue(errorAtom);

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Ocorreu um Erro</AlertTitle>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Tentar Novamente
        </Button>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <SearchInput />
      {paginatedItems.length > 0 ? (
        <>
          <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
            {paginatedItems.map((item) => (
              <Grid key={item.cnpj} size={{ xs: 12, sm: 6, md: 4 }}>
                <CorretoraCard corretora={item} />
              </Grid>
            ))}
          </Grid>
          <PaginationControls />
        </>
      ) : (
        <Typography textAlign="center" p={4} color="text.secondary">
          {searchQuery
            ? "Nenhum resultado encontrado para a sua busca."
            : "Nenhuma corretora encontrada com o status 'EM FUNCIONAMENTO NORMAL'."}
        </Typography>
      )}
    </Box>
  );
};
