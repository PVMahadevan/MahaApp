import api from "./custom/authApi";
import { handleError, handleResponse } from "../utils/response";

export const login = (data)=> api.post("/realms/master/protocol/openid-connect/token", data, {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      }
}).then(handleResponse).catch(handleError)



export const getUserInfo = ()=> api.get("/realms/master/protocol/openid-connect/userinfo").then(handleResponse).catch(handleError)