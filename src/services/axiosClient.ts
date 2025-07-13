import { ICorretora } from "@/types";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCorretoras = async (): Promise<ICorretora[]> => {
  const response = await axiosClient.get("/cvm/corretoras/v1");
  return response.data;
};

export const getCorretoraByCnpj = async (cnpj: string): Promise<ICorretora> => {
  // Remove caracteres não numéricos para garantir que a URL esteja limpa
  const cleanedCnpj = cnpj.replace(/[^\d]/g, "");
  const response = await axiosClient.get(`/cvm/corretoras/v1/${cleanedCnpj}`);
  return response.data;
};
