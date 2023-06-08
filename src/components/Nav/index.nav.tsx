import StyledNav from "./style";
import log from "../../assets/logo-min-withe.svg";
import { FaUser } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import { createPortal } from "react-dom";
import Modal from "../Modals/Users/Modal/index.modal";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/index.context";
import { motion } from "framer-motion";

const Nav = () => {
  const [modal, setModal] = useState(false);
  const { user, setToken, setUser, setListClients, navigate } =
    useContext(AuthContext);

  return createPortal(
    <StyledNav>
      {modal && <Modal modal={setModal} />}
      <div>
        <motion.button
          initial={{ overflow: "hidden", maxWidth: "30px" }}
          onClick={() => setModal((e) => !e)}
          className="userButton_"
          type="button"
        >
          {user?.img_user_src ? (
            <img className="my" src={user.img_user_src} />
          ) : (
            <FaUser className="userButton" />
          )}
        </motion.button>
        <button
          onClick={() => navigate("/dashboard")}
          className="logo"
          type="button"
        >
          <img src={log}></img>
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setToken("");
            setUser(null);
            setListClients([]);
            navigate("/login");
          }}
          className="home"
          type="button"
        >
          <AiOutlineExport />
        </button>
      </div>
    </StyledNav>,
    document.body
  );
};

export default Nav;
