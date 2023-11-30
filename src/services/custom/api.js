import axios from "axios";


export const baseURL = process.env.REACT_API_BASE_URL;

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

export const getAuthorizationHeader = (token) => `Bearer ${token || getToken()}`;

export const api = axios.create({
  baseURL,
  headers: { Authorization: getAuthorizationHeader() },
});

export default api;