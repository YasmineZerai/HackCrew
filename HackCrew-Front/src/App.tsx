import { Route, Routes } from "react-router";
import RegisterPage from "./pages/register";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "./pages/login";
import AuthProvider from "./context/auth/context";
import NotLoggedInRoutes from "./middlewares/not-logged-in-routes";
import LoggedInRoutes from "./middlewares/logged-in-routes";
import Home from "./pages/dashboard/home";
import UserProvider from "./context/user/user";
import TeamsProvider from "./context/teams/teams";

function App() {
  return (
    <AuthProvider>
      <Toaster className="bg-coll2-teal-200 text-white" />
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route
          element={
            <UserProvider>
              <LoggedInRoutes />
            </UserProvider>
          }
        >
          <Route
            path="/home"
            element={
              <TeamsProvider>
                <Home />
              </TeamsProvider>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
