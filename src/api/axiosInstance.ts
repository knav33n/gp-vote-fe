import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
        return Promise.reject({
          message: "Request timed out. Please try again later.",
        });
      }

      if (error.response && error.response.status === 401) {
        return Promise.reject({
          message: "Please try logging in again.",
        });
      }
    }
    return Promise.reject(error);
  }
);
