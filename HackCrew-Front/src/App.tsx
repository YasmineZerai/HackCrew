import { Route, Routes } from "react-router";
import RegisterPage from "./pages/register";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <Toaster className="bg-coll2-teal-200 text-white" />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
