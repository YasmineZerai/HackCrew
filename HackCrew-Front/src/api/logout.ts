import { axios } from "@/lib/axios";
import { isAxiosError } from "axios";

export const logoutApi = async () => {
  try {
    const { data } = await axios.post("/logout");
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];
    throw new Error("Something went wrong");
  }
};
