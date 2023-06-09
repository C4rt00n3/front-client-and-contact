import Button from "../../components/Button/index.button";
import StyledLogin from "./style";
import logo from "../../assets/logo-customers.svg";
import demo from "../../assets/demo-2.svg";
import Input from "../../components/input/index.input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType, userExtend } from "./interfaces";
import { api } from "../../service";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/index.context";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userExtend),
  });
  const { setUser } = useContext(AuthContext);
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const post = async (data: any) => {
    setLoad(true);
    try {
      const request: AxiosResponse<UserType> = await api.post("/user", data);

      setUser(request.data);
      toast.success("Sucesso!");
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <StyledLogin img={demo}>
      <div className="boxForm">
        <img src={logo} alt="" />
        <h3>Register</h3>
        <form onSubmit={handleSubmit((e) => post(e))}>
          <div>
            <Input
              schema={register("name")}
              placeholder="Digite seu nome ..."
              label="Name"
              name="name"
              htmlFor="name"
              type="text"
            />
            <small>{errors.name?.message?.toString()}</small>
          </div>
          <div>
            <Input
              placeholder="Digite seu e-mail ..."
              schema={register("email")}
              name="email"
              label="E-email"
              htmlFor="email"
              type="text"
            />
            <small>{errors.email?.message?.toString()}</small>
          </div>
          <div>
            <Input
              placeholder="Digite sua senha ..."
              schema={register("password")}
              name="password"
              label="Senha"
              htmlFor="password"
              type="password"
            />
            <small>{errors.password?.message?.toString()}</small>
          </div>
          <div>
            <Input
              schema={register("confirmPassword")}
              name="confirmPassword"
              placeholder="Repita sua senha ..."
              label="Repita sua senha"
              htmlFor="password-r"
              type="password"
            />
            <small>{errors.confirmPassword?.message?.toString()}</small>
          </div>
          <Button type="submit">
            {!load ? (
              "Cadastra-se"
            ) : (
              <AiOutlineLoading3Quarters className="load" />
            )}
          </Button>
          <small>
            Já tem uma conta? <Link to="/login"> faça login!</Link>
          </small>
        </form>
      </div>

      <div className="imageBox"></div>
    </StyledLogin>
  );
};

export default Register;
