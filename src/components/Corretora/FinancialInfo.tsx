import { ICorretora } from "@/types";
import { formatCurrency, formatDate } from "@/utils/formatters";
import EventIcon from "@mui/icons-material/Event";
import { Divider, Grid, Typography } from "@mui/material";

interface FinancialInfoProps {
  corretora: ICorretora;
}

export const FinancialInfo = ({ corretora }: FinancialInfoProps) => (
  <Grid size={{ xs: 12, md: 6 }}>
    <Typography variant="h6" gutterBottom>
      Dados Financeiros e de Registro
    </Typography>
    <Typography>
      Patrimônio Líquido:
      <strong>{formatCurrency(corretora.valor_patrimonio_liquido)}</strong>
    </Typography>
    <Typography color="text.secondary" variant="body2">
      em {formatDate(corretora.data_patrimonio_liquido)}
    </Typography>

    <Divider sx={{ my: 2 }} />

    <Typography>Código CVM: {corretora.codigo_cvm}</Typography>
    <Typography display="flex" alignItems="center">
      <EventIcon sx={{ mr: 1 }} /> Data de Registro:
      {formatDate(corretora.data_registro)}
    </Typography>
    <Typography display="flex" alignItems="center">
      <EventIcon sx={{ mr: 1 }} /> Início da Situação:
      {formatDate(corretora.data_inicio_situacao)}
    </Typography>
  </Grid>
);
