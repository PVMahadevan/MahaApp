import axios from "axios";

export const baseURL = "http://13.233.191.14:4445";

export const api = axios.create({
  baseURL,
});

export default api;