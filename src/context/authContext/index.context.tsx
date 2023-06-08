import { createContext, useEffect, useState } from "react";
import {
  iAuthExportProps,
  iAuthProps,
  iUpload,
  type iClients,
  iContacts,
} from "./interface";
import { api } from "../../service";
import { AxiosResponse } from "axios";
import { UserType } from "../../pages/register/interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({} as iAuthExportProps);

const AuthProvider = ({ children }: iAuthProps) => {
  const auth = localStorage.getItem("token") || null;
  const [user, setUser] = useState<UserType | null>(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditCleint, setModalEditCleint] = useState({
    open: false,
    edit: false,
  });
  const [modalDelete, setModalDelete] = useState(false);
  const [contacts, setContacts] = useState<iContacts[] | []>([]);
  const [token, setToken] = useState(auth);
  const [theme, setTheme] = useState(false);
  const [page, setPage] = useState(1);
  const [idClient, setIdClient] = useState("");
  const [modalImageUser, setImageUser] = useState(false);
  const [listClients, setListClients] = useState<iClients[] | []>([]);
  const remove = (uuid: string) => listClients.filter((e) => e.id !== uuid);

  const uplaod = async (e: File) => {
    const data = new FormData();

    if (!e) {
      return;
    }

    data.append("image", e);

    try {
      const uploadImage: AxiosResponse<iUpload> = await api.post(
        "https://api.imgbb.com/1/upload?key=9f50bb7211b6d66174cdd8851b1f4149",
        data
      );

      return uploadImage.data.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const get = async () => {
    const userId = localStorage.getItem("userId");
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
      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data?.message);
      return false;
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const findAll = async () => {
      try {
        const requistion = await api.get(`/client`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (requistion.data.length > 0) {
          return setListClients(requistion.data);
        }

        return;
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data?.message);
      }
    };

    get();

    findAll();
  }, [page, token, setListClients, navigate]);

  return (
    <AuthContext.Provider
      value={{
        get,
        navigate,
        setIdClient,
        idClient,
        user,
        setUser,
        modalEdit,
        modalEditCleint,
        setModalEdit,
        setModalEditCleint,
        uplaod,
        setTheme,
        remove,
        theme,
        token,
        listClients,
        page,
        setPage,
        setToken,
        setListClients,
        contacts,
        setContacts,
        modalImageUser,
        setImageUser,
        setModalDelete,
        modalDelete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
