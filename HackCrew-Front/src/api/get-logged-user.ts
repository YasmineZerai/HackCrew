import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const getLoggedUser = async (signal?: AbortSignal) => {
  try {
    const { data } = await axios.get("/users/me", { signal });
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
