import * as yup from "yup";
export interface iAuthProps {
  children: React.ReactNode;
}
import { z } from "zod";

export interface iAuthExportProps {
  theme: boolean;
  listClients: [] | iClients[];
  token: string | null;
  page: number;
  remove: (uuid: string) => iClients[];
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setListClients: React.Dispatch<React.SetStateAction<[] | iClients[]>>;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  uplaod: (e: File) => Promise<string | undefined>;
  modalEdit: boolean;
  setContacts: React.Dispatch<React.SetStateAction<[] | iContacts[]>>;
  contacts: [] | iContacts[];
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalEditCleint: {
    open: boolean;
    edit: boolean;
  };
  setModalEditCleint: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      edit: boolean;
    }>
  >;
  user: {
    name: string;
    email: string;
    password: string;
    img_user_src?: string | undefined;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      img_user_src?: string | undefined;
    }>
  >;
  setIdClient: React.Dispatch<React.SetStateAction<string>>;
  idClient: string;
}

export const clientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().nonempty("Digite um nome").max(50),
  email: z
    .string()
    .nonempty("Email é obrigatorio")
    .email({ message: "Digite um email válido" })
    .max(120),
  img_user_src: z.string().optional(),
  telephone: z.string().nonempty().max(15),
});

export const contactSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(50).nonempty("Name obrigatorio"),
  email: z
    .string()
    .email("digite um email valido")
    .max(120)
    .nonempty("E-mail obrigatorio"),
  img_user_src: z.string().optional(),
  telephone: z.string().max(15).nonempty("telefone obrigatorio"),
  telegram: z.string().max(15).optional(),
  instagram: z.string().max(30).optional(),
});

export const contactSchemaedit = contactSchema.partial();

export const clientEditSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(50).optional(),
  email: z.string().max(120).optional(),
  img_user_src: z.string().optional(),
  telephone: z.string().max(15).optional(),
  instagram: z.string().max(30).optional(),
});

type iClients = {
  id: string;
  name: string;
  email: string;
  password: string;
  img_client_src: string | null;
  telephone: string;
};

interface iCleintsPaginates {
  next: null | string;
  prev: null | string;
  length: number;
  data: iClients[];
}

interface iUpload {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: number;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

interface iContacts {
  id: string;
  name: string;
  email: string;
  telephone: string;
  created_at: string;
  instagram: null | string;
  telegram: null | string;
  clientId: string;
}

export interface iContactPaginates {
  next: null | string;
  prev: null | string;
  length: number;
  data: iContacts[];
}

export { type iCleintsPaginates, type iClients, type iUpload, type iContacts };
