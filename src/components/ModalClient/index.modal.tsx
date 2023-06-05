import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import Input from "../input/index.input";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../Button/index.button";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  clientEditSchema,
  iClients,
} from "../../context/authContext/interface";
import { api } from "../../service";
import { AuthContext } from "../../context/authContext/index.context";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const ModalClient = ({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { token, idClient, remove, setListClients, uplaod } =
    useContext(AuthContext);
  const [file, setFile] = useState<null | File>(null);
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
        modal((e) => !e);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [modal]);

  const editObj = (obj: any) => {
    Object.keys(obj).forEach(function (key) {
      if (obj[key] && typeof obj[key] === "object") {
        editObj(obj[key]);
      } else if (obj[key] === "") {
        delete obj[key];
      }
    });

    return obj;
  };

  const update = async (data: any) => {
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
    }
  };

  return createPortal(
    <StyledModalBox>
      <StyledModal ref={ref}>
        <div className="headerModal">
          <h4>Editar cliente</h4>

          <Button type="button">
            <AiFillCloseCircle />
          </Button>
        </div>
        <form onSubmit={handleSubmit(update)}>
          <Input
            schema={register("name")}
            name="name"
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

            <p>{file?.name ? file.name : "Esclha uma foto"}</p>
          </div>

          <Button type="submit">Editar</Button>
        </form>
      </StyledModal>
    </StyledModalBox>,
    document.body
  );
};

export default ModalClient;
