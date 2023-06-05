import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext/index.context";
import Button from "../Button/index.button";
import { AiFillCloseCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../service";
import { toast } from "react-toastify";
import TextArea from "../TextArea/index.input";
import { AxiosResponse } from "axios";
import { UserType } from "../../pages/register/interfaces";
import Input from "../input/index.input";

const schema = z.object({
  name: z.string().max(50).optional(),
  email: z.string().email().max(120).min(8).optional(),
  password: z.string().max(120).optional(),
});

const Modal = ({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<null | File>(null);
  const { uplaod, user, token, setUser } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        modal((e) => !e);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const patch = async (data: any) => {
    if (
      data.name === user.name &&
      data.password == "" &&
      data.email == user.email &&
      !file
    ) {
      return;
    }

    if (file) {
      const img = await uplaod(file);
      data.img_user_src = img;
    }

    if (data.email == user.email) {
      delete data.email;
    }

    if (data.password == "") {
      delete data.password;
    }

    if (data.name === user.name) {
      delete data.name;
    }

    try {
      const request: AxiosResponse<UserType> = await api.patch("/user", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(request.data);
      toast.success("Sucesso!");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return createPortal(
    <StyledModalBox>
      <StyledModal ref={ref}>
        <div className="headerModal">
          <h4>Editar usuário</h4>

          <Button type="button">
            <AiFillCloseCircle />
          </Button>
        </div>
        <form onSubmit={handleSubmit(patch)}>
          <TextArea
            schema={register("name")}
            name="name"
            label="Name"
            placeholder="Digite seu nome..."
            value={user.name}
          />
          <small>{errors?.name?.message?.toString()}</small>
          <TextArea
            schema={register("email")}
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail..."
            value={user.email}
          />
          <small>{errors?.email?.message?.toString()}</small>

          <Input
            schema={register("password")}
            name="password"
            label="Senha"
            placeholder="Digite sua nova senha..."
            type="password"
          />
          <small>{errors?.password?.message?.toString()}</small>

          <div className="boxFile">
            <p>{file?.name}</p>
            <label className="file" htmlFor="upload">
              Sua Foto
            </label>
            <input
              onChange={(e) => setFile(e.target.files![0])}
              id={"upload"}
              placeholder="Digite sua nova senha"
              type="file"
            />
          </div>

          <Button type="submit">Editar</Button>
        </form>
      </StyledModal>
    </StyledModalBox>,
    document.body
  );
};

export default Modal;
