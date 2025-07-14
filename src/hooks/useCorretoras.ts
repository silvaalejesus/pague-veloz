"use client";

import { getCorretoras } from "@/services/axiosClient";
import { allItemsAtom, errorAtom, isLoadingAtom } from "@/store/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

export const useCorretoras = () => {
  const [allItems, setAllItems] = useAtom(allItemsAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const setError = useSetAtom(errorAtom);

  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await getCorretoras();
      setAllItems(data);
    } catch (error) {
      console.error("Falha ao buscar as corretoras:", error);
      const errorMessage =
        error.message || "Ocorreu um erro inesperado. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [setAllItems, setIsLoading, setError]);

  useEffect(() => {
    if (allItems.length > 0) {
      return;
    }
    fetchData();
  }, [allItems, fetchData]);

  return {
    isLoading: useAtomValue(isLoadingAtom),
    refetch: fetchData,
  };
};
