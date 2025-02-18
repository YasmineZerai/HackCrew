import { getTeamsApi } from "@/api/teams/get-teams";
import { useAuth } from "@/context/auth/context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function NotLoggedInRoutes() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      if (auth.isLoggedIn) {
        const data = await getTeamsApi();
        const teams = data[0].payload.teams;
        if (teams.length === 0) navigate("/home/demo");
        else navigate("/home");
      }
    };

    fetchTeams();
  }, [auth.isLoggedIn]);

  return <Outlet />;
}
