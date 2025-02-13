import { axios } from "@/lib/axios";
import { isAxiosError } from "axios";

type loginArgs = {
  email: string;
  password: string;
};

export const loginApi = async (args: loginArgs) => {
  try {
    const { data } = await axios.post("/login", args);
    console.log(data);
    return [data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];
    throw new Error("Something went wrong");
  }
};
