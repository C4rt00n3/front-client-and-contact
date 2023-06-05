import { useContext, useEffect } from "react";
import Nav from "../../components/Nav/index.nav";
import CardClients from "./components/CardClients/index.cards";
import InputSeach from "./components/InputSeach/index.input";
import StyledHome from "./style";
import { AuthContext } from "../../context/authContext/index.context";
import { api } from "../../service";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { UserType } from "../register/interfaces";

const Home = () => {
  const { page, token, setListClients, setUser, user, listClients } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId") || null;
    if (!userId) {
      localStorage.removeItem("token");
    }

    const get = async () => {
      try {
        const request: AxiosResponse<UserType> = await api.get(
          "/user/" + userId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(request.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    get();
    setTimeout(() => {
      get();
    }, 300);
  }, [token]);

  console.log(user);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    const findAll = async () => {
      try {
        const requistion = await api.get(`/client`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setListClients(requistion.data);
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };

    findAll();
  }, [page, token, setListClients, navigate]);

  return (
    <>
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
