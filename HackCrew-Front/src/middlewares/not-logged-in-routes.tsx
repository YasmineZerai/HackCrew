import { useAuth } from "@/context/auth/context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function NotLoggedInRoutes() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) navigate("/home");
  }, [auth.isLoggedIn]);

  return <Outlet />;
}
