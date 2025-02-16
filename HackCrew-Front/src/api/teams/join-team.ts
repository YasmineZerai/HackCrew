import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const joinTeamApi = async (code: string) => {
  try {
    const { data } = await axios.post("/memebrs", { code: code });
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
