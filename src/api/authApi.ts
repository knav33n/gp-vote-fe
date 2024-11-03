import { axiosInstance } from "./axiosInstance";

export const registerApi = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginApi = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};
