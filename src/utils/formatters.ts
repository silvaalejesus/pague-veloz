export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("pt-BR", { timeZone: "UTC" });

export const formatCurrency = (value: string): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number(value)
  );
