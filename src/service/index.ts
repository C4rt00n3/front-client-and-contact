import axios from "axios";

const Url = "https://client-and-contat.onrender.com";

export const api = axios.create({
  baseURL: Url,
  timeout: 15000,
});
