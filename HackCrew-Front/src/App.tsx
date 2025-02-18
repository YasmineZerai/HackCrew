import { Outlet, Route, Routes } from "react-router";
import RegisterPage from "./pages/register";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "./pages/login";
import AuthProvider from "./context/auth/context";
import NotLoggedInRoutes from "./middlewares/not-logged-in-routes";
import LoggedInRoutes from "./middlewares/logged-in-routes";
import Home from "./pages/dashboard/home";
import UserProvider from "./context/user/user";
import TeamsProvider from "./context/teams/teams";
import DemoPage from "./pages/DemoPage/demo";

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
            element={
              <TeamsProvider>
                <Outlet />
              </TeamsProvider>
            }
          >
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/home/demo" element={<DemoPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
