import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/index.login";
import Register from "../pages/register/index.register";
import Home from "../pages/home/index.home";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext/index.context";
import Protect from "./ProtectRoute/index.protect";
import Loading from "../pages/Loading/index.load";

const RoutesMain = () => {
  const { token, get } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={token ? <Protect /> : <Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default RoutesMain;
