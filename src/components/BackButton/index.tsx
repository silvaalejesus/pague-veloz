"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={handleGoBack}
    >
      Voltar
    </Button>
  );
};
