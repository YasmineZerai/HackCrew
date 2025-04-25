import { axios } from "@/lib/axios";
import { isAxiosError } from "axios";

type getTeamTodosArgs = {
  teamId: string;
};

export const getTeamTodosApi = async (args: getTeamTodosArgs) => {
  try {
    const { data } = await axios.get(`/teams/${args.teamId}/todos`);
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];
    throw new Error("Something went wrong");
  }
};
