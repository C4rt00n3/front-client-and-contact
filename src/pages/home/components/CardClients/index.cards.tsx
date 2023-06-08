import { motion } from "framer-motion";
import { AuthContext } from "../../../../context/authContext/index.context";
import Iten from "./iten/index.iten";
import StyleCardClient from "./style";
import { useContext } from "react";
import ModalCleintCreate from "../../../../components/Modals/Clients/ModalCleintCreat/index.modal";

const CardClients = () => {
  const { listClients, setModalEditCleint, modalEditCleint } =
    useContext(AuthContext);

  return (
    <>
      <div className="client">
        <h3>Clientes:</h3>
        <motion.button
          onClick={() =>
            setModalEditCleint((e) => Object({ open: !e.open, edit: true }))
          }
        >
          New
        </motion.button>
        {modalEditCleint.open && (
          <ModalCleintCreate modal={setModalEditCleint} />
        )}
      </div>
      <StyleCardClient>
        {listClients.length == 0 && <h4>Não há clientes</h4>}
        {listClients.map((e, i) => (
          <Iten key={i} element={e} />
        ))}
      </StyleCardClient>
    </>
  );
};

export default CardClients;
