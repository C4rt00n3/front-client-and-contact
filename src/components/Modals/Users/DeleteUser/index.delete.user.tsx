import StyledDeleteUser from "./style";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/authContext/index.context";
import { api } from "../../../../service";
import { toast } from "react-toastify";

const DeleteUserModal = () => {
  const [close, setClose] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { setModalDelete, token, navigate, setUser } = useContext(AuthContext);

  const deleteApi = async () => {
    try {
      await api.delete("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Sucesso!");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setUser(null);
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
  }, []);

  useEffect(() => {
    if (!close) {
      return;
    }

    const closeModal = () => {
      setTimeout(() => {
        setModalDelete((e) => !e);
      }, 400);
    };

    closeModal();
  }, [close, setModalDelete]);

  return createPortal(
    <StyledDeleteUser>
      <motion.div
        ref={ref}
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
        <div className="headerModal">
          <h3>Deletar usuário</h3>
          <motion.div
            onClick={() => setClose((e) => !e)}
            initial={{ background: "none", width: 30, height: 30 }}
          >
            <AiFillCloseCircle />
          </motion.div>
        </div>
        <div className="boxContent">
          <p>Tem certeza que deseja excluir?</p>
          <div>
            <motion.button
              onClick={() => setClose((e) => !e)}
              initial={{
                backgroundColor: "rgb(0,273,28,0.1)",
                outline: "solid  1px rgb(0,273,28)",
                color: "var(--withe)",
                boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
              whileHover={{
                backgroundColor: "rgb(0,273,28, 0.5)",
              }}
            >
              Voltar
            </motion.button>
            <motion.button
              onClick={() => deleteApi()}
              initial={{
                backgroundColor: "rgb(273,16,16, 0.1)",
                outline: "solid  1px rgb(273,16,16)",
                color: "var(--withe)",
                boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
              whileHover={{
                backgroundColor: "rgb(273,16,16, 0.5)",
              }}
            >
              Excluir
            </motion.button>
          </div>
        </div>
      </motion.div>
    </StyledDeleteUser>,
    document.body
  );
};

export default DeleteUserModal;
