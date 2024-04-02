import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../../src/pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { HomePage } from "../pages/HomePage/HomePage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
};
