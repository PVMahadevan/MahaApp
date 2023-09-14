import axios from "axios";

// export const baseURL = "http://13.233.191.14:4445";
export const baseURL = "http://localhost:3001";

export const getToken = () => {
  let authInfo = localStorage.getItem("ta-auth")
  if (authInfo) {
    try {
      authInfo = JSON.parse(authInfo);
    } catch (error) {
      console.log('Parse error')
    }
  }
  return authInfo?.token;
}

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const api = axios.create({
  baseURL,
  headers: { Authorization: getAuthorizationHeader() },
});

export default api;