import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import Input from "../input/index.input";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext/index.context";
import Button from "../Button/index.button";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, iContacts } from "../../context/authContext/interface";
import { AxiosResponse } from "axios";
import { api } from "../../service";
import { toast } from "react-toastify";

const ModalContact = ({
  modal,
  setContacts,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  setContacts: React.Dispatch<React.SetStateAction<[] | iContacts[]>>;
}) => {
  const [image, setImg] = useState<string | undefined>("");
  const [file, setFile] = useState({} as File);
  const { uplaod, idClient, token } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
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

  const uploadImage = async (e = file) => {
    if (e) {
      const link = await uplaod(e);

      if (link) {
        setImg(link);
      }
    }
  };

  const create = async (data: any) => {
    data.client_id = idClient;
    console.log(data);
    try {
      const request: AxiosResponse<iContacts> = await api.post(
        "/contact",
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(request);

      setContacts((e) => [request.data, ...e]);

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
          <h4>Criar contato</h4>

          <Button type="button">
            <AiFillCloseCircle />
          </Button>
        </div>
        <form onSubmit={handleSubmit(create)}>
          <Input
            schema={register("name")}
            name="name"
            label="Name"
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
          <Input
            schema={register("instagram")}
            name="instagram"
            label="Instagram"
            placeholder="Digite um instagram.."
            type="text"
          />
          <small>{errors.instagram?.message?.toString()}</small>
          <Input
            schema={register("telegram")}
            name="telegram"
            label="Telegram"
            placeholder="Digite um telegram.."
            type="text"
          />
          <small>{errors.telegram?.message?.toString()}</small>
          <Button type="submit">criar</Button>
        </form>
      </StyledModal>
    </StyledModalBox>,
    document.body
  );
};

export default ModalContact;
