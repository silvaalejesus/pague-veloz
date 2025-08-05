"use client";

import { cvmCodeAtom } from "@/store/atoms";
import { TextField } from "@mui/material";
import { useAtom } from "jotai";

interface ItemsListProps {
  isLoading: boolean;
}

export const CvmFilter = ({ isLoading }: ItemsListProps) => {
  const [cvmCode, setCvmCode] = useAtom(cvmCodeAtom);

  return (
    <TextField
      label="Filtrar por Código CVM"
      variant="outlined"
      fullWidth
      value={cvmCode}
      onChange={(e) => setCvmCode(e.target.value)}
      disabled={isLoading}
    />
  );
};
