import { axios } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export const inviteUserApi = async (teamId: string, email: string) => {
  try {
    const { data } = await axios.post(`teams/${teamId}/invitations`, {
      email: email,
    });
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];

    throw new Error("Something went wrong");
  }
};
