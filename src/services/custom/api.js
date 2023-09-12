import axios from "axios";

export const baseURL = "http://127.0.0.1:3001";

export const getToken = () => {
//    const accessToken = localStorage.getItem("accessToken")
//    return accessToken;
}

// export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const api = axios.create({
  baseURL,
//   headers: { Authorization: getAuthorizationHeader() },
});

export default api;