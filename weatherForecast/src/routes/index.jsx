import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../../src/pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};
