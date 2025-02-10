import RegisterPage from "./pages/register";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
