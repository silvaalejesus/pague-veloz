"use client";

import { useCorretoras } from "@/hooks";
import { paginatedItemsAtom, searchQueryAtom } from "@/store/atoms";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { PaginationControls } from "../PaginationControls";
import { SearchInput } from "../SearchInput";

export const ItemsList = () => {
  const { isLoading } = useCorretoras();
  const paginatedItems = useAtomValue(paginatedItemsAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

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
          <List>
            {paginatedItems.map((item, index) => (
              <Box key={item.cnpj}>
                <ListItem>
                  <ListItemText
                    primary={item.nome_comercial}
                    secondary={`CNPJ: ${item.cnpj}`}
                  />
                </ListItem>
                {index < paginatedItems.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
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
