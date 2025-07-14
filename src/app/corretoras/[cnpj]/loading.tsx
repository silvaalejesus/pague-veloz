import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ height: "80vh" }}
    >
      <Typography>Aguarde, estamos carregando as informacoes</Typography>
      <CircularProgress size={60} />
    </Box>
  );
}
