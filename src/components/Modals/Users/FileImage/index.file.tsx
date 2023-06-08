import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import StyledModalFile from "./style";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/authContext/index.context";
import { AxiosResponse } from "axios";
import { api } from "../../../../service";
import { toast } from "react-toastify";
import { UserType } from "../../../../pages/register/interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FileImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [file, setFile] = useState<null | File>(null);

  const { setImageUser, modalImageUser, uplaod, token, setUser } =
    useContext(AuthContext);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        setImageUser((e) => !e);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [setImageUser]);

  const update = async () => {
    setLoad(true);

    if (!file) {
      return;
    }

    const img_user_src = await uplaod(file);

    try {
      const request: AxiosResponse<UserType> = await api.patch(
        "/user",
        { img_user_src },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUser(request.data);
      toast.success("Sucesso!");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  return !modalImageUser ? (
    <motion.div
      initial={{
        backgroundColor: "rgb(0,0,0,0.5)",
        flex: 1,
        position: "fixed",
        y: -window.innerHeight,
      }}
      animate={{ y: 0, transition: { duration: 0.4 } }}
    >
      <StyledModalFile>
        <div ref={ref}>
          <div>
            <h3>Adicione uma imagem</h3>
            <motion.button
              onClick={() => setImageUser((e) => !e)}
              animate={{ background: "none", color: "var(--withe)" }}
            >
              <AiFillCloseCircle />
            </motion.button>
          </div>
          <form>
            <label htmlFor="image">Selecione uma imagem</label>
            <motion.div className="boxFile">
              <motion.label
                whileHover={{
                  backgroundColor: "rgb(98, 60, 234, 0.5)",
                }}
                className="foto"
                htmlFor="image"
              >
                Sua foto
              </motion.label>
              <small>{"image.png"}</small>
              <input
                onChange={(e) => setFile(e?.target?.files![0])}
                type="file"
                id="image"
              />
            </motion.div>
            <motion.div className="boxButtons">
              <motion.button
                type="button"
                onClick={() => update()}
                whileHover={{
                  backgroundColor: "rgb(98,60,234, 0.1)",
                  outline: "1px solid var(--colorbrand1)",
                  boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
                className="add"
              >
                {!load ? (
                  "Adicionar"
                ) : (
                  <AiOutlineLoading3Quarters className="loop" />
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </StyledModalFile>
    </motion.div>
  ) : (
    <></>
  );
};

export default FileImage;
