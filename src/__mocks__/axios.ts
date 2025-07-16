const mAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
};

const axiosMock = {
  create: jest.fn(() => mAxiosInstance),
  isAxiosError: jest.fn(),
};

export default axiosMock;
