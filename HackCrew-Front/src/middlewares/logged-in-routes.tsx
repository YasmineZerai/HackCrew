import { useAuth } from "@/context/auth/context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoggedInRoutes() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) navigate("/login");
    toast("You must log in first");
  }, [auth.isLoggedIn]);

  return <Outlet />;
}
