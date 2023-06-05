import axios from "axios";

const Url = "http://localhost:3000";

export const api = axios.create({
  baseURL: Url,
  timeout: 15000,
});
