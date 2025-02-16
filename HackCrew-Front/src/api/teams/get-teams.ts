import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const getTeamsApi = async () => {
  try {
    const { data } = await axios.get("/teams");
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
