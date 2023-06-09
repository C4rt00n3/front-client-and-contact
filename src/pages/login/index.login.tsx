import Button from "../../components/Button/index.button";
import StyledLogin from "./style";
import logo from "../../assets/logo-customers.svg";
import demo from "../../assets/demo.svg";
import Input from "../../components/input/index.input";
import { z } from "zod";
import { api } from "../../service";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/index.context";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Digite um email válido" })
    .max(120)
    .nonempty("Email é obrigatorio"),
  password: z.string().min(8).max(120).nonempty("senha é obrigatorio"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [load, setLoad] = useState(false);
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = async (data: any) => {
    setLoad(true);
    try {
      const request: AxiosResponse<{ token: string; user_id: string }> =
        await api.post("/login", data);
      localStorage.setItem("token", request.data.token);
      localStorage.setItem("userId", request.data.user_id);
      setToken(request.data.token);
      toast.success("Sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data?.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <StyledLogin img={demo}>
      <div className="boxForm">
        <img src={logo} alt="" />
        <h3>Login</h3>
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              schema={register("email")}
              name="email"
              placeholder="Digite seu e-mail ..."
              label="E-email"
              htmlFor="senha"
              type="text"
            />
            <small>{errors.email?.message?.toString()}</small>
          </div>
          <div>
            <Input
              placeholder="Digite sua senha..."
              schema={register("password")}
              name="password"
              label="Senha"
              htmlFor="password"
              type="password"
            />
            <small>{errors.password?.message?.toString()}</small>
          </div>
          <Button type="submit">
            {!load ? "Submit" : <AiOutlineLoading3Quarters className="load" />}
          </Button>
          <small>
            Ainda não tem uma conta?{" "}
            <Link to="/register"> Registre Agora!</Link>
          </small>
        </form>
      </div>

      <div className="imageBox"></div>
    </StyledLogin>
  );
};

export default Login;
