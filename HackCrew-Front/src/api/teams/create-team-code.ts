import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const createTeamCodeApi = async (teamId: string) => {
  try {
    const { data } = await axios.post(`/teams/${teamId}/codes`);
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
