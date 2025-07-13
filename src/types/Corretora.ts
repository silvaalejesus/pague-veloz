export interface ICorretora {
  cnpj: string;
  type: string;
  nome_social: string;
  nome_comercial: string;
  status: Status;
  email: string;
  telefone: string;
  cep: string;
  pais: string;
  uf: string;
  municipio: string;
  bairro: string;
  complemento: string | null;
  logradouro: string;
  data_patrimonio_liquido: string;
  valor_patrimonio_liquido: string;
  codigo_cvm: string;
  data_inicio_situacao: string;
  data_registro: string;
}

export type Status = "EM FUNCIONAMENTO NORMAL" | "CANCELADA";
