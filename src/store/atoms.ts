import { ICorretora } from "@/types";
import { atom } from "jotai";

export const allItemsAtom = atom<ICorretora[]>([]);

export const isLoadingAtom = atom<boolean>(true);

export const currentPageAtom = atom<number>(1);

// Paginação simples porque a api nao tem paginacao por padrao e retorna varios dados
export const itemsPerPageAtom = atom<number>(20);

export const searchQueryAtom = atom<string>("");

export const errorAtom = atom<string | null>(null);

// Busca apenas as corretoras que estão ativas
export const activeItemsAtom = atom((get) => {
  const allItems = get(allItemsAtom);
  return allItems.filter((item) => item.status === "EM FUNCIONAMENTO NORMAL");
});

export const filteredItemsAtom = atom((get) => {
  const activeItems = get(allItemsAtom);
  const searchQuery = get(searchQueryAtom);
  const lowerCaseSearchQuery = searchQuery.toLowerCase();

  if (!searchQuery) {
    return activeItems;
  }

  const result = activeItems.filter((item) => {
    const hasNomeComercial = (
      item.nome_comercial?.toLowerCase() ?? ""
    ).includes(lowerCaseSearchQuery);
    const hasNomeSocial = (item.nome_social?.toLowerCase() ?? "").includes(
      lowerCaseSearchQuery
    );

    const cleanSearchCnpj = searchQuery.replace(/[^\d]/g, "");
    let hasCnpj = false;

    // Só busca por CNPJ se o termo de busca tiver algum número
    if (cleanSearchCnpj.length > 0) {
      const cleanItemCnpj = item.cnpj?.replace(/[^\d]/g, "") ?? "";
      hasCnpj = cleanItemCnpj.includes(cleanSearchCnpj);
    }

    return hasNomeComercial || hasNomeSocial || hasCnpj;
  });

  return result;
});

export const paginatedItemsAtom = atom((get) => {
  const filteredItems = get(filteredItemsAtom);
  const currentPage = get(currentPageAtom);
  const itemsPerPage = get(itemsPerPageAtom);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredItems.slice(startIndex, endIndex);
});
