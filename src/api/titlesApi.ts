import { axiosInstance } from "./axiosInstance";

export const getTitlesApi = async () => {
  const response = await axiosInstance.get("/title");
  return response.data;
};

export const postTitleApi = async (title: string) => {
  const response = await axiosInstance.post("/title", { title });
  return response.data;
};
