import axiosInstance from "./axiosConfig";

export const getTasks = async () => {
  const response = await axiosInstance("/tasks");
  console.log("Fetched tasks:", response.data);
  return response.data;
};
