import { ICorretora } from "@/types";
import { Box, Chip, Typography } from "@mui/material";

interface CorretoraHeaderProps {
  corretora: ICorretora;
}

export const CorretoraHeader = ({ corretora }: CorretoraHeaderProps) => {
  const statusColor =
    corretora.status === "EM FUNCIONAMENTO NORMAL" ? "success" : "error";

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {corretora.nome_comercial}
        </Typography>
        <Chip label={corretora.status} color={statusColor} />
      </Box>
      <Typography variant="h6" color="text.secondary" mb={3}>
        {corretora.nome_social}
      </Typography>
    </>
  );
};
