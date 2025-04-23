import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const getUserApi = async (userId: string) => {
  try {
    const { data } = await axios.get(`/users/${userId}`);
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
