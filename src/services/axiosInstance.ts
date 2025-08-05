import axios, { AxiosError } from "axios";
import { setupCache } from "axios-cache-interceptor";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const axiosClient = setupCache(axiosInstance, {
  ttl: 15 * 60 * 1000, // Tempo de vida do cache: 15 minutos
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    if (error.code === "ECONNABORTED") {
      console.error("Timeout da requisição excedido:", error.message);
      return Promise.reject({
        isCustom: true,
        userMessage:
          "O servidor demorou muito para responder. Tente novamente.",
      });
    }

    console.error("Erro na requisição Axios:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    return Promise.reject(error);
  }
);
