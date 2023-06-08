import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/authContext/index.context";
import Button from "../../../Button/index.button";
import { AiFillCloseCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../service";
import { toast } from "react-toastify";
import TextArea from "../../../TextArea/index.input";
import { AxiosResponse } from "axios";
import { UserType } from "../../../../pages/register/interfaces";
import Input from "../../../input/index.input";
import { motion } from "framer-motion";

const schema = z
  .object({
    name: z.string().max(50).optional(),
    email: z
      .string()
      .max(120, { message: "at most 8 characters" })
      .email()
      .optional(),
    password: z.string().optional(),
  })
  .deepPartial();

const Modal = ({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<null | File>(null);
  const [close, setClose] = useState(false);
  const { uplaod, user, token, setUser, setModalDelete } =
    useContext(AuthContext);
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
        setClose((e) => !e);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [modal]);

  useEffect(() => {
    if (!close) {
      return;
    }

    const closeModal = () => {
      setTimeout(() => {
        modal((e) => !e);
      }, 400);
    };

    closeModal();
  }, [close, modal]);

  const patch = async (data: any) => {
    if (
      data.name === user?.name &&
      data.password == "" &&
      data.email == user?.email &&
      !file
    ) {
      return;
    }

    if (file) {
      const img = await uplaod(file);
      data.img_user_src = img;
    }

    if (data.email == user?.email) {
      delete data.email;
    }

    if (data.password == "") {
      delete data.password;
    }

    if (data.name === user?.name) {
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
      <motion.div
        initial={{
          opacity: 0,
          y: !close ? -window.innerHeight : 0,
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
        animate={{
          opacity: 1,
          y: close ? -window.innerHeight : 0,
          transition: {
            duration: 0.4,
          },
        }}
      >
        <StyledModal ref={ref}>
          <div className="headerModal">
            <h4>Editar usuário</h4>

            <button onClick={() => setClose((e) => !e)} type="button">
              <AiFillCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit(patch)}>
            <TextArea
              schema={register("name")}
              name="name"
              label="Name"
              placeholder="Digite seu nome..."
            >
              {user?.name + ""}
            </TextArea>
            <small>{errors?.name?.message?.toString()}</small>
            <TextArea
              schema={register("email")}
              name="email"
              label="E-mail"
              placeholder="Digite seu e-mail..."
            >
              {user?.email + ""}
            </TextArea>
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
            <small>
              Deseja excluir?{" "}
              <motion.button
                onClick={() => {
                  setClose((e) => !e);
                  setModalDelete((e) => !e);
                }}
                initial={{ background: "none" }}
              >
                <strong style={{ color: "red", cursor: "pointer" }}>
                  clique aqui.
                </strong>
              </motion.button>
            </small>
          </form>
        </StyledModal>
      </motion.div>
    </StyledModalBox>,
    document.body
  );
};

export default Modal;
