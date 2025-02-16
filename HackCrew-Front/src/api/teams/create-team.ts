import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const createTeamApi = async (teamName: string) => {
  try {
    const { data } = await axios.post("/teams", { teamName: teamName });
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
