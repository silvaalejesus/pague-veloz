"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: "auto",
          display: "flex",
          minHeight: "60vh",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" paragraph>
          Página Não Encontrada
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Desculpe, não conseguimos encontrar a página que você está procurando.
          Talvez o CNPJ informado esteja incorreto?
        </Typography>

        <Button
          href="/"
          LinkComponent={Link}
          size="large"
          variant="contained"
          sx={{ mt: 4 }}
        >
          Voltar para o Início
        </Button>
      </Box>
    </Container>
  );
}
