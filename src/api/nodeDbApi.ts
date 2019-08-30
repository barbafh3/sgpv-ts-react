import axios from "axios";

export const nodeDbHandler = axios.create({
  responseType: "json",
  baseURL: "http://localhost:3001"
});
