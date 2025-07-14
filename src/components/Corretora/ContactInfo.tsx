import { ICorretora } from "@/types";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Divider, Grid, Typography } from "@mui/material";

interface ContactInfoProps {
  corretora: ICorretora;
}

export const ContactInfo = ({ corretora }: ContactInfoProps) => (
  <Grid size={{ xs: 12, md: 6 }}>
    <Typography variant="h6" gutterBottom>
      Informações de Contato
    </Typography>
    <Typography display="flex" alignItems="center" gutterBottom>
      <EmailIcon sx={{ mr: 1 }} /> {corretora.email}
    </Typography>
    <Typography display="flex" alignItems="center">
      <PhoneIcon sx={{ mr: 1 }} /> {corretora.telefone}
    </Typography>

    <Divider sx={{ my: 2 }} />

    <Typography variant="h6" gutterBottom>
      Endereço
    </Typography>
    <Typography display="flex" alignItems="center">
      <BusinessIcon sx={{ mr: 1 }} /> {corretora.logradouro},
      {corretora.complemento}
    </Typography>
    <Typography>Bairro: {corretora.bairro}</Typography>
    <Typography>
      {corretora.municipio} - {corretora.uf}, CEP: {corretora.cep}
    </Typography>
    <Typography>País: {corretora.pais || "Não informado"}</Typography>
  </Grid>
);
