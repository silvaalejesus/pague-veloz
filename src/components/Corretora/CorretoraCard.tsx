"use client";

import { ICorretora } from "@/types";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface CorretoraCardProps {
  corretora: ICorretora;
}

export const CorretoraCard = ({ corretora }: CorretoraCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/corretoras/${corretora.cnpj}`);
  };

  const statusColor =
    corretora.status === "EM FUNCIONAMENTO NORMAL" ? "success" : "error";

  return (
    <CardActionArea
      onClick={handleCardClick}
      component="div"
      sx={{ height: "100%", borderRadius: 2 }}
    >
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="flex-end" mb={1}>
            <Chip label={corretora.status} color={statusColor} size="small" />
          </Box>

          <Typography variant="h6" component="h2" gutterBottom>
            {corretora.nome_comercial}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            CNPJ: {corretora.cnpj}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};
