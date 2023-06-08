import { createPortal } from "react-dom";
import StyledModal, { StyledModalBox } from "./style";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/authContext/index.context";
import Button from "../../../Button/index.button";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  contactSchemaedit,
  iContacts,
} from "../../../../context/authContext/interface";
import TextArea from "../../../TextArea/index.input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../../../service";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ModalContactEdit = ({
  modal,
  contact,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  contact: iContacts;
}) => {
  const { token, contacts, setContacts } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const [close, setClose] = useState(false);

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
            <h4>Editar contato</h4>

            <button onClick={() => setClose((e) => !e)} type="button">
              <AiFillCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit(update)}>
            <TextArea
              schema={register("name")}
              name="name"
              label="Name"
              placeholder="Digite um nome..."
            >
              {contact.name}
            </TextArea>
            <small>{errors?.name?.message?.toString()}</small>
            <TextArea
              schema={register("email")}
              name={"email"}
              label="E-mail"
              placeholder="Digite um e-mail..."
            >
              {contact.email}
            </TextArea>
            <small>{errors?.email?.message?.toString()}</small>
            <TextArea
              schema={register("telephone")}
              name={"telephone"}
              label="Telefone"
              placeholder="Digite um telefone.."
            >
              {contact.telephone}
            </TextArea>
            <small>{errors?.telephone?.message?.toString()}</small>
            <TextArea
              schema={register("instagram")}
              name="instagram"
              label="Instagram"
              placeholder="Digite um instagram.."
            >
              {contact.instagram ? contact.instagram : ""}
            </TextArea>
            <small>{errors?.instagram?.message?.toString()}</small>
            <TextArea
              schema={register("telegram")}
              name="telegram"
              label="Telegram"
              placeholder="Digite um telegram.."
            >
              {contact.telegram ? contact.telegram : ""}
            </TextArea>
            <small>{errors?.telegram?.message?.toString()}</small>
            <Button type="submit">Editar</Button>
          </form>
        </StyledModal>
      </motion.div>
    </StyledModalBox>,
    document.body
  );
};

export default ModalContactEdit;
