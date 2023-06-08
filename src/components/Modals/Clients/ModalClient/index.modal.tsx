import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../../Button/index.button";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  clientEditSchema,
  iClients,
} from "../../../../context/authContext/interface";
import { api } from "../../../../service";
import { AuthContext } from "../../../../context/authContext/index.context";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "../../../TextArea/index.input";
import { motion } from "framer-motion";

const ModalClient = ({
  element,
  modal,
}: {
  element: iClients;
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { token, idClient, remove, setListClients, uplaod } =
    useContext(AuthContext);
  const [file, setFile] = useState<null | File>(null);
  const [load, setLoad] = useState(false);
  const [close, setClose] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientEditSchema),
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
      modal((e) => !e);
    }, 400);
  }, [close, modal]);

  const editObj = (obj: any) => {
    Object.keys(obj).forEach(function (key) {
      if (obj[key] && typeof obj[key] === "object") {
        editObj(obj[key]);
      } else if (obj[key] === "") {
        delete obj[key];
      }
    });

    return removerValoresIguais(obj, element);
  };

  function removerValoresIguais(obj1: any, obj2: any): any {
    const novoObjeto: any = { ...obj1 };

    for (const prop in obj1) {
      if (
        Object.prototype.hasOwnProperty.call(obj1, prop) &&
        Object.prototype.hasOwnProperty.call(obj2, prop)
      ) {
        if (obj1[prop] === obj2[prop]) {
          delete novoObjeto[prop];
        }
      }
    }

    return novoObjeto;
  }

  const update = async (data: any) => {
    setLoad((e) => !e);

    if (file) {
      const img = await uplaod(file);
      if (!img) {
        toast.error("Imagem error");
        return;
      }
      Object.assign(data, {
        img_client_src: img,
      });
      setFile(null);
    }
    const newData = editObj(data);

    console.log(newData);

    try {
      const request: AxiosResponse<iClients> = await api.patch(
        "/client/" + idClient,
        newData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const arrayClient = remove(idClient);

      setListClients([request.data, ...arrayClient]);
      toast.success("Sucesso!");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoad((e) => !e);
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
            <h4>Editar cliente</h4>

            <button onClick={() => setClose((e) => !e)} type="button">
              <AiFillCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit(update)}>
            <TextArea
              htmlFor="name"
              schema={register("name")}
              name="name"
              label="Nome"
              placeholder="Digite um nome..."
            >
              {element?.name}
            </TextArea>
            <small>{errors.name?.message?.toString()}</small>
            <TextArea
              htmlFor="email"
              schema={register("email")}
              name="email"
              label="E-mail"
              placeholder="Digite um e-mail..."
            >
              {element.email}
            </TextArea>
            <small>{errors.email?.message?.toString()}</small>
            <TextArea
              htmlFor="telephone"
              schema={register("telephone")}
              name="telephone"
              label="Telefone"
              placeholder="Digite um telefone.."
            >
              {element?.telephone}
            </TextArea>
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

              <p>{file?.name ? file.name : "Esclha uma foto"}</p>
            </div>

            <Button type="submit">
              {!load ? "Edita" : <AiOutlineLoading3Quarters className="loop" />}
            </Button>
          </form>
        </StyledModal>
      </motion.div>
    </StyledModalBox>,
    document.body
  );
};

export default ModalClient;
