import { useContext } from "react";
import Nav from "../../components/Nav/index.nav";
import CardClients from "./components/CardClients/index.cards";
import InputSeach from "./components/InputSeach/index.input";
import StyledHome from "./style";
import { AuthContext } from "../../context/authContext/index.context";
import FileImage from "../../components/Modals/Users/FileImage/index.file";
import DeleteUserModal from "../../components/Modals/Users/DeleteUser/index.delete.user";

const Home = () => {
  const { user, modalDelete } = useContext(AuthContext);
  return (
    <>
      {user?.img_user_src !== "" ? "" : <FileImage />}
      {modalDelete && <DeleteUserModal />}
      <Nav />
      <StyledHome>
        <div className="box_input">
          <InputSeach />
        </div>

        <div className="box_list">
          <CardClients />
        </div>
      </StyledHome>
    </>
  );
};

export default Home;
