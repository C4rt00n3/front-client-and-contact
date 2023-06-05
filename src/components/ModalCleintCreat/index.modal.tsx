import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import Input from "../input/index.input";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext/index.context";
import Button from "../Button/index.button";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { clientSchema, iClients } from "../../context/authContext/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../service";
import { AxiosResponse } from "axios";
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
  const [image, setImg] = useState<string | undefined>("");
  const [file, setFile] = useState<null | File>(null);
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
        modal((e) => Object({ open: !e.open, edit: e.edit }));
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const create = async (data: any) => {
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
    }
  };

  // const uploadImage = async (e = file) => {
  //   if (e) {
  //     const link = await uplaod(e);

  //     if (link) {
  //       setImg(link);
  //     }
  //   }
  // };

  return createPortal(
    <StyledModalBox>
      <StyledModal ref={ref}>
        <div className="headerModal">
          <h4>Criar cliente</h4>

          <Button type="button">
            <AiFillCloseCircle />
          </Button>
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

          <Button type="submit">Criar</Button>
        </form>
      </StyledModal>
    </StyledModalBox>,
    document.body
  );
};

export default ModalCleintCreate;
