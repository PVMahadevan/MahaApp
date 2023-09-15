import axios from "axios";


export let baseURL = "http://localhost:4445"
if(process.env.REACT_APP_ENV === 'server'){
  baseURL = "http://13.233.191.14:4445";
}

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