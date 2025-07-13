"use client";

import { getCorretoras } from "@/services/axiosClient";
import { allItemsAtom, isLoadingAtom } from "@/store/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export const useCorretoras = () => {
  const setAllItems = useSetAtom(allItemsAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCorretoras();

        if (isMounted) {
          setAllItems(data);
        }
      } catch (error) {
        console.error("Falha ao buscar as corretoras:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [setAllItems, setIsLoading]);

  return { isLoading };
};
