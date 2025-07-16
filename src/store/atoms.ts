import { ICorretora } from "@/types";
import { atom } from "jotai";

export const allItemsAtom = atom<ICorretora[]>([]);

export const isLoadingAtom = atom<boolean>(true);

export const currentPageAtom = atom<number>(1);

// Paginação simples porque a api nao tem paginacao por padrao e retorna varios dados
export const itemsPerPageAtom = atom<number>(30);

export const searchQueryAtom = atom<string>("");

export const errorAtom = atom<string | null>(null);

export const selectedUfsAtom = atom<string[]>([]);
export const selectedStatusesAtom = atom<string[]>([]);

// Busca apenas as corretoras que estão ativas
export const activeItemsAtom = atom((get) => {
  const allItems = get(allItemsAtom);
  return allItems.filter((item) => item.status === "EM FUNCIONAMENTO NORMAL");
});

export const filteredItemsAtom = atom((get) => {
  const allItems = get(allItemsAtom);
  const query = get(searchQueryAtom).toLowerCase();
  const selectedUfs = get(selectedUfsAtom);
  const selectedStatuses = get(selectedStatusesAtom);

  return allItems.filter((item) => {
    const nomeComercial = item.nome_comercial?.toLowerCase() ?? "";
    const nomeSocial = item.nome_social?.toLowerCase() ?? "";
    const cnpj = item.cnpj?.replace(/[^\d]/g, "") ?? "";
    const searchCnpj = query.replace(/[^\d]/g, "");

    const matchesSearch =
      nomeComercial.includes(query) ||
      nomeSocial.includes(query) ||
      (searchCnpj.length > 0 && cnpj.includes(searchCnpj));

    const matchesUf = selectedUfs.length === 0 || selectedUfs.includes(item.uf);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(item.status);

    return matchesSearch && matchesUf && matchesStatus;
  });
});

export const paginatedItemsAtom = atom((get) => {
  const filteredItems = get(filteredItemsAtom);
  const currentPage = get(currentPageAtom);
  const itemsPerPage = get(itemsPerPageAtom);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredItems.slice(startIndex, endIndex);
});
