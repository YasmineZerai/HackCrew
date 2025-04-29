import { axios } from "@/lib/axios";
import { isAxiosError } from "axios";

type GetRessourcesArgs = {
  teamId: string;
};

export const getTeamRessourcesApi = async (args: GetRessourcesArgs) => {
  try {
    const { data } = await axios.get(`/teams/${args.teamId}/ressources`);
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];
    throw new Error("Something went wrong");
  }
};
