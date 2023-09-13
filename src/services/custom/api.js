import axios from "axios";

export const baseURL = "http://13.233.191.14:4445";

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