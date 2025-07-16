import { mockCorretoras } from "@/__mocks__/api";
import { axiosClient } from "@/services/axiosInstance";
import { AxiosError } from "axios";
import { getAllCorretoras, getCorretoraByCnpj } from "../corretoraService";

jest.mock("@/services/axiosInstance");
const mockedAxios = axiosClient as jest.Mocked<typeof axiosClient>;

describe("corretoraService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar todas as corretoras", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCorretoras });

    const result = await getAllCorretoras();

    expect(result).toEqual(mockCorretoras);
    expect(mockedAxios.get).toHaveBeenCalledWith("/cvm/corretoras/v1");
  });

  it("deve retornar uma corretora por CNPJ", async () => {
    const cnpj = "76.621.457/0001-85";

    mockedAxios.get.mockResolvedValueOnce({ data: mockCorretoras });

    const result = await getCorretoraByCnpj(cnpj);

    expect(result).toEqual(mockCorretoras);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "/cvm/corretoras/v1/76621457000185"
    );
  });

  it("deve retornar null em caso de erro", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Erro 404"));

    const result = await getCorretoraByCnpj("00.000.000/0001-00");

    expect(result).toBeNull();
  });
});

describe("corretoraService - timeout", () => {
  it("deve tratar timeout quando a requisição exceder 10 segundos", async () => {
    const timeoutError: Partial<AxiosError> = {
      code: "ECONNABORTED",
      message: "timeout of 10000ms exceeded",
      isAxiosError: true,
    };

    mockedAxios.get.mockRejectedValueOnce(timeoutError);

    const result = await getCorretoraByCnpj("76621457000185");

    expect(result).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "/cvm/corretoras/v1/76621457000185"
    );
  });
});
