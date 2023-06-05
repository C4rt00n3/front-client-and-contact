import { createContext, useState } from "react";
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

export const AuthContext = createContext({} as iAuthExportProps);

const AuthProvider = ({ children }: iAuthProps) => {
  const auth = localStorage.getItem("token") || null;
  const [user, setUser] = useState({} as UserType);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditCleint, setModalEditCleint] = useState({
    open: false,
    edit: false,
  });
  const [contacts, setContacts] = useState<iContacts[] | []>([]);
  const [token, setToken] = useState(auth);
  const [theme, setTheme] = useState(false);
  const [page, setPage] = useState(1);
  const [idClient, setIdClient] = useState("");
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

  console.log(listClients);

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
