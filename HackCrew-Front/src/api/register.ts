import { axios } from "@/lib/axios";
import { isAxiosError } from "axios";

type RegisterArgs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerApi = async (args: RegisterArgs) => {
  try {
    const { data } = await axios.post("/users", args);
    console.log(data);
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];
    throw new Error("Something went wrong");
  }
};
