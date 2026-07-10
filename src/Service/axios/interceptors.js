import axiosInstance from "./axiosInstance";

// Setup request interceptors
export const setupRequestInterceptor = () => {
  const interceptor = axiosInstance.interceptors.request.use(
    (config) => {
      // You can add loading indicators here
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return interceptor;
};

// Setup response interceptors
export const setupResponseInterceptor = () => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return interceptor;
};

// Eject interceptors (useful for testing)
export const ejectInterceptors = (requestId, responseId) => {
  if (requestId) {
    axiosInstance.interceptors.request.eject(requestId);
  }
  if (responseId) {
    axiosInstance.interceptors.response.eject(responseId);
  }
};
