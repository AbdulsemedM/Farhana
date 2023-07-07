import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api",
  //   withCredentials: true,
  //   credentials: "include",
});
export const LOGIN = axios.create({
  baseURL: "http://localhost:8000",
});
