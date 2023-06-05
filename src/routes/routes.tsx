import { Navigate, Route, Routes } from "react-router-dom";
import { Test } from "../components";
import Login from "../pages/login/index.login";
import Register from "../pages/register/index.register";
import Home from "../pages/home/index.home";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesMain;
