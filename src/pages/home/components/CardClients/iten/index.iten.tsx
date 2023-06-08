import { AiOutlineDown } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import ClientImg from "../../Client/index.client";
import { useContext, useState } from "react";
import {
  iClients,
  iContacts,
} from "../../../../../context/authContext/interface";
import { AuthContext } from "../../../../../context/authContext/index.context";
import { api } from "../../../../../service";
import { MdOutlineOpenInNew } from "react-icons/md";
import ModalContact from "../../../../../components/Modals/Contacts/ModalContact/index.modal";
import ModalClient from "../../../../../components/Modals/Clients/ModalClient/index.modal";
import ModalContactEdit from "../../../../../components/Modals/Contacts/ModalContactEdit/index.modal";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const Iten = ({ element }: { element: iClients }) => {
  const [contact, setContact] = useState({} as iContacts);
  const [open, setOpen] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalContactEdit, setModalContactEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const { remove, setListClients, token, setIdClient, contacts, setContacts } =
    useContext(AuthContext);

  const contactsGet = async () => {
    try {
      const requistion: AxiosResponse<iContacts[]> = await api.get(`/contact`, {
        params: { client_id: element.id },
        headers: { Authorization: `Bearer ${token}` },
      });

      setContacts(requistion.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIten = async (id: string, rota: string) => {
    try {
      await api.delete(`/${rota}/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Sucesso!");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const removeContacts = (id: string) => contacts.filter((e) => e.id !== id);

  return (
    <motion.li
      initial={{ y: "50px" }}
      animate={{
        y: 0,
        transition: {
          duration: 1,
        },
        minHeight: !open ? "auto" : "max-content",
      }}
    >
      {modalContactEdit && (
        <ModalContactEdit contact={contact} modal={setModalContactEdit} />
      )}
      <div className="boxContent">
        <div className="user">
          {element.img_client_src ? (
            <img src={element.img_client_src} />
          ) : (
            <ClientImg />
          )}
          <p>{element.name}</p>
        </div>
        <div className="funcs">
          <motion.button
            onClick={() => {
              deleteIten(element.id, "client");
              setListClients(remove(element.id));
            }}
            whileHover={{ color: "red" }}
            className="delete"
          >
            <MdDelete />
          </motion.button>
          <motion.button
            whileHover={{ opacity: 0.5 }}
            onClick={() => {
              contactsGet();
              setOpen((e) => !e);
            }}
            animate={{
              rotateY: !open ? 0 : 180,
              rotateX: !open ? 0 : 180,

              transition: {
                duration: 0.1,
              },
            }}
            className="open"
          >
            <AiOutlineDown />
          </motion.button>
        </div>
      </div>
      {open ? (
        <div className="contacts">
          <div className="boxInfos">
            <div className="infoHeader">
              <h3>Informações do cliente</h3>

              <motion.button
                onClick={() => {
                  setIdClient(element.id);
                  setModal((e) => !e);
                }}
                className="button"
              >
                editar
              </motion.button>
            </div>
            {modal && <ModalClient element={element} modal={setModal} />}

            <div className="infos">
              <p>
                Name: <small>{element.name}</small>
              </p>
              <p>
                Telefone: <small>{element.telephone}</small>
              </p>
              <p>
                E-mail: <small>{element.email}</small>
              </p>
            </div>
          </div>
          <div className="boxContacts">
            <h3>Contacts</h3>
            <motion.button
              onClick={() => {
                setIdClient(element.id);
                setModalContact((e) => !e);
              }}
              className="button"
            >
              New
            </motion.button>

            {modalContact && (
              <ModalContact setContacts={setContacts} modal={setModalContact} />
            )}
          </div>
          <ul>
            {contacts.length == 0 && <h4>Não a contatos para esse cliente</h4>}
            {contacts.map((e, i) => (
              <motion.li key={i}>
                <h4>{e.name}</h4>
                <div>
                  <motion.button
                    onClick={() => {
                      deleteIten(e.id, "contact");
                      setContacts(removeContacts(e.id));
                    }}
                    animate={{ color: "var(--withe" }}
                  >
                    <MdDelete />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setContact(e);
                      setModalContactEdit((e) => !e);
                    }}
                    whileHover={{ opacity: 0.5 }}
                  >
                    <MdOutlineOpenInNew />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </motion.li>
  );
};

export default Iten;
