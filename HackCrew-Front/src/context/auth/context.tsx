import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { authReducer } from "./reducer";
import { loginApi } from "@/api/auth/login";
import { logoutApi } from "@/api/auth/logout";
import { axios } from "@/lib/axios";
import { useShouldFetch } from "../should-fetch";
import { jwtDecode } from "jwt-decode";

type LoginArgs = {
  email: string;
  password: string;
};

type AuthStore = {
  isLoggedIn: boolean;
  login: (args: LoginArgs) => Promise<any[]>;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthStore);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatcher] = useReducer(
    authReducer,
    {
      isLoggedIn: false,
      token: null,
    },
    () => {
      const token = localStorage.getItem("token");
      if (!token)
        return {
          isLoggedIn: false,
          token: null,
        };

      return {
        isLoggedIn: true,
        token,
      };
    }
  );

  const { handleShouldFetch } = useShouldFetch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        dispatcher({ type: "LOGOUT" });
      } else {
        axios.interceptors.request.use((request) => {
          request.headers["authorization"] = `Bearer ${token}`;
          return request;
        });

        handleShouldFetch(true);
      }
    }
  }, [state.token]);

  const login = async (args: LoginArgs) => {
    const response = await loginApi(args);
    const [data, error] = response;
    if (data) {
      const token = data.payload.token;
      axios.interceptors.request.use((request) => {
        request.headers["authorization"] = `Bearer ${token}`;
        return request;
      });
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (
            error.response &&
            error.response.data.message === "invalid/expired token"
          ) {
            localStorage.removeItem("token");
            dispatcher({ type: "LOGOUT" });
          }
          return Promise.reject(error);
        }
      );
      localStorage.setItem("token", token);
      dispatcher({ type: "LOGIN", token });
    }
    return response;
  };

  const logout = async () => {
    await logoutApi();
    localStorage.removeItem("token");
    dispatcher({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: state.isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
