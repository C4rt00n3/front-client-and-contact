import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext/index.context";
import Button from "../Button/index.button";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  contactSchemaedit,
  iContacts,
} from "../../context/authContext/interface";
import TextArea from "../TextArea/index.input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../service";
import { toast } from "react-toastify";

const ModalContactEdit = ({
  modal,
  contact,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  contact: iContacts;
}) => {
  const { token, contacts, setContacts } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchemaedit),
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

  const removeIten = (uuid: string) => contacts.filter((e) => e.id !== uuid);
  const array = removeIten(contact.id);

  const update = async (data: any) => {
    if (contact.telephone === data.telephone) {
      delete data.telephone;
    }

    if (contact.email === contact.email) {
      delete data.email;
    }

    const newData = editObj(data);
    try {
      const request = await api.patch(`/contact/${contact.id}`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts([request.data, ...array]);
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
          <h4>Contato</h4>

          <Button type="button">
            <AiFillCloseCircle />
          </Button>
        </div>
        <form onSubmit={handleSubmit(update)}>
          <TextArea
            schema={register("name")}
            name="name"
            value={contact.name}
            label="Name"
            placeholder="Digite um nome..."
          />
          <small>{errors?.name?.message?.toString()}</small>
          <TextArea
            schema={register("email")}
            name={"email"}
            value={contact.email}
            label="E-mail"
            placeholder="Digite um e-mail..."
          />
          <small>{errors?.email?.message?.toString()}</small>
          <TextArea
            schema={register("telephone")}
            name={"telephone"}
            value={contact.telephone}
            label="Telefone"
            placeholder="Digite um telefone.."
          />
          <small>{errors?.telephone?.message?.toString()}</small>
          <TextArea
            schema={register("instagram")}
            name="instagram"
            value={contact.instagram ? contact.instagram : ""}
            label="Instagram"
            placeholder="Digite um instagram.."
          />
          <small>{errors?.instagram?.message?.toString()}</small>
          <TextArea
            schema={register("telegram")}
            name="telegram"
            value={contact.telegram ? contact.telegram : ""}
            label="Telegram"
            placeholder="Digite um telegram.."
          />
          <small>{errors?.telegram?.message?.toString()}</small>

          <Button type="submit">Editar</Button>
        </form>
      </StyledModal>
    </StyledModalBox>,
    document.body
  );
};

export default ModalContactEdit;
