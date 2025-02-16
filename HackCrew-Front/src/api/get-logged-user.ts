import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const getLoggedUser = async () => {
  try {
    const { data } = await axios.get("/users/me");
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
