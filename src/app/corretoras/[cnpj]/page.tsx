import { BackButton } from "@/components/BackButton";
import { ContactInfo } from "@/components/Corretora/ContactInfo";
import { CorretoraHeader } from "@/components/Corretora/CorretoraHeader";
import { FinancialInfo } from "@/components/Corretora/FinancialInfo";
import { getCorretoraByCnpj } from "@/services/corretoraService";
import { Box, Container, Divider, Grid, Paper } from "@mui/material";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    cnpj: string;
  };
}

export default async function CorretoraDetailPage({ params }: PageProps) {
  const { cnpj } = await params;
  const corretora = await getCorretoraByCnpj(cnpj);

  if (!corretora) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box mb={2}>
        <BackButton />
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <CorretoraHeader corretora={corretora} />

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <ContactInfo corretora={corretora} />
          <FinancialInfo corretora={corretora} />
        </Grid>
      </Paper>
    </Container>
  );
}
