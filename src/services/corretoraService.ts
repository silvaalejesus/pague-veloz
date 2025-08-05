import { ICorretora } from "@/types";
import { axiosInstance } from "./axiosInstance";

export const getAllCorretoras = async (): Promise<ICorretora[]> => {
  const response = await axiosInstance.get("/cvm/corretoras/v1");

  console.log(
    `[CorretoraService] Requisição concluída. Veio do cache? ->`,
    response.cached
  );

  return response.data;
};

export const getCorretoraByCnpj = async (
  cnpj: string
): Promise<ICorretora | null> => {
  try {
    const cleanedCnpj = cnpj.replace(/[^\d]/g, "");
    const response = await axiosInstance.get(
      `/cvm/corretoras/v1/${cleanedCnpj}`
    );
    return response.data;
  } catch (error) {
    console.error(`Falha ao buscar corretora com CNPJ ${cnpj}:`, error);
    return null;
  }
};
