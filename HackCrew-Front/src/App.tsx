import { Route, Routes } from "react-router";
import RegisterPage from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="Register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
