import axios from "axios";

export const requestHandler = axios.create({
  responseType: "json",
  baseURL: "http://localhost:3333"
});
