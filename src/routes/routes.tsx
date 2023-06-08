import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/index.login";
import Register from "../pages/register/index.register";
import { useContext } from "react";
import { AuthContext } from "../context/authContext/index.context";
import Protect from "./ProtectRoute/index.protect";

const RoutesMain = () => {
  const { token } = useContext(AuthContext);

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
