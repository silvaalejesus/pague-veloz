import { mockCorretoras } from "@/__mocks__/api";
import { createStore } from "jotai";
import {
  activeItemsAtom,
  allItemsAtom,
  currentPageAtom,
  filteredItemsAtom,
  itemsPerPageAtom,
  paginatedItemsAtom,
  searchQueryAtom,
} from "../atoms";

const setupJotaiStore = (
  callback: (store: ReturnType<typeof createStore>) => void
) => {
  const store = createStore();
  callback(store);
  return store;
};

describe("activeItemsAtom", () => {
  it("deve retornar apenas corretoras com status EM FUNCIONAMENTO NORMAL", () => {
    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, [
        { ...mockCorretoras, status: "EM FUNCIONAMENTO NORMAL" },
        { ...mockCorretoras, status: "CANCELADA" },
      ]);
    });

    const activeItems = store.get(activeItemsAtom);
    expect(
      activeItems.every((item) => item.status === "EM FUNCIONAMENTO NORMAL")
    ).toBe(true);
  });
});

describe("filteredItemsAtom", () => {
  it("deve filtrar por nome_comercial, nome_social ou cnpj", () => {
    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, mockCorretoras);
      store.set(searchQueryAtom, "4UM");
    });

    const filtered = store.get(filteredItemsAtom);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].nome_comercial).toContain("4UM");
  });

  it("deve filtrar por nome_comercial", () => {
    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, mockCorretoras);
      store.set(searchQueryAtom, "INVESTIMENTOS");
    });

    const filtered = store.get(filteredItemsAtom);

    const result = filtered.some((item) =>
      item.nome_comercial?.toLowerCase().includes("investimentos".toLowerCase())
    );

    expect(result).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it("deve filtrar por nome_social", () => {
    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, mockCorretoras);
      store.set(searchQueryAtom, "ALFA CORRETORA");
    });

    const filtered = store.get(filteredItemsAtom);

    const result = filtered.some((item) =>
      item.nome_social?.toLowerCase().includes("alfa corretora".toLowerCase())
    );

    expect(result).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it("deve filtrar por parte do CNPJ", () => {
    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, mockCorretoras);
      store.set(searchQueryAtom, "7662"); // início do CNPJ da 4UM
    });

    const filtered = store.get(filteredItemsAtom);

    const result = filtered.some((item) =>
      item.cnpj.replace(/[^\d]/g, "").includes("7662")
    );

    expect(result).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it("deve filtrar por CNPJ mesmo com caracteres especiais", () => {
    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, mockCorretoras);

      store.set(searchQueryAtom, "76.621.457/0001-85");
    });

    const filtered = store.get(filteredItemsAtom);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].cnpj).toBe("76621457000185");
  });

  it("deve retornar corretoras com status CANCELADA e EM FUNCIONAMENTO NORMAL", () => {
    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, mockCorretoras);

      store.set(searchQueryAtom, "");
    });

    const filtered = store.get(filteredItemsAtom);

    expect(filtered).toHaveLength(2);
  });
});

describe("paginatedItemsAtom", () => {
  it("deve retornar apenas os itens da página atual", () => {
    const itens = Array.from({ length: 10 }, (_, i) => ({
      ...mockCorretoras,
      cnpj: String(i),
      status: "EM FUNCIONAMENTO NORMAL",
    }));

    const store = setupJotaiStore((store) => {
      store.set(allItemsAtom, itens);
      store.set(currentPageAtom, 2);
      store.set(itemsPerPageAtom, 5);
      store.set(searchQueryAtom, "");
    });

    const result = store.get(paginatedItemsAtom);
    expect(result).toHaveLength(5);
    expect(result[0].cnpj).toBe("5");
  });
});
