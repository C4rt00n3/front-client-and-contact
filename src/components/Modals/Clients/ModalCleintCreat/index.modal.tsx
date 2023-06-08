import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import Input from "../../../input/index.input";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/authContext/index.context";
import Button from "../../../Button/index.button";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  clientSchema,
  iClients,
} from "../../../../context/authContext/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../service";
import { AxiosResponse } from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ModalCleintCreate = ({
  modal,
}: {
  modal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      edit: boolean;
    }>
  >;
}) => {
  const [file, setFile] = useState<null | File>(null);
  const [load, setLoad] = useState(false);
  const [close, setClose] = useState(false);
  const { uplaod, token, setListClients } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
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

    setTimeout(() => {
      modal((e) => Object({ open: !e.open, edit: e.edit }));
    }, 400);
  }, [close, modal]);

  const create = async (data: any) => {
    setLoad(true);
    if (file) {
      const img = await uplaod(file);
      console.log(img);
      data.img_client_src = img;
    }

    try {
      const request: AxiosResponse<iClients> = await api.post("/client", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setListClients((e) => [...e, request.data]);
      toast.success("Sucesso!");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  return createPortal(
    <StyledModalBox>
      <motion.div
        initial={{
          opacity: !close ? 0 : 1,
          y: !close ? -window.innerHeight : 0,
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
        animate={{
          opacity: close ? 0 : 1,
          y: close ? -window.innerHeight : 0,
          transition: {
            duration: 0.4,
          },
        }}
      >
        <StyledModal ref={ref}>
          <div className="headerModal">
            <h4>Criar cliente</h4>

            <button onClick={() => setClose((e) => !e)} type="button">
              <AiFillCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit(create)}>
            <Input
              name="name"
              schema={register("name")}
              label="Nome"
              placeholder="Digite um nome..."
              type="text"
            />
            <small>{errors.name?.message?.toString()}</small>
            <Input
              schema={register("email")}
              name="email"
              label="E-mail"
              placeholder="Digite um e-mail..."
              type="text"
            />
            <small>{errors.email?.message?.toString()}</small>
            <Input
              schema={register("telephone")}
              name="telephone"
              label="Telefone"
              placeholder="Digite um telefone.."
              type="text"
            />
            <small>{errors.telephone?.message?.toString()}</small>

            <div className="boxFile">
              <label className="file" htmlFor="upload">
                Buscar
              </label>
              <input
                onChange={(e) => setFile(e.target.files![0])}
                id={"upload"}
                type="file"
              />
              <p>{file?.name ? file.name : "Escolha uma foto"}</p>
            </div>

            <Button type="submit">
              {!load ? "Criar" : <AiOutlineLoading3Quarters className="loop" />}
            </Button>
          </form>
        </StyledModal>
      </motion.div>
    </StyledModalBox>,
    document.body
  );
};

export default ModalCleintCreate;
