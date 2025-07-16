import { formatDate, formatCurrency } from "@/utils/formatters";

describe("formatDate", () => {
  it("deve formatar data válida para pt-BR", () => {
    const result = formatDate("2024-12-31");
    expect(result).toBe("31/12/2024");
  });

  it("deve retornar 'Invalid Date' para string inválida", () => {
    const result = formatDate("1111-88-97");
    expect(result).toBe("Invalid Date");
  });

  it("deve retornar 'Invalid Date' para string vazia", () => {
    const result = formatDate("");
    expect(result).toBe("Invalid Date");
  });
});

describe("formatCurrency", () => {
  const formatExpected = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  it("deve formatar valor string numérica corretamente", () => {
    const result = formatCurrency("1234.56");
    expect(result).toBe(formatExpected(1234.56));
  });

  it("deve formatar valor inteiro como moeda", () => {
    const result = formatCurrency("1000");
    expect(result).toBe(formatExpected(1000));
  });

  it("deve retornar 'R$ 0,00' para string vazia", () => {
    const result = formatCurrency("");
    expect(result).toBe(formatExpected(0));
  });

  it("deve retornar 'R$ NaN' para valor inválido", () => {
    const result = formatCurrency("abc");
    expect(result).toBe(formatExpected(NaN));
  });
});
