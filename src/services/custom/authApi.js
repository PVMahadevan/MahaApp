import axios from "axios";
import { keycloakConfig } from "../../keycloak";

export const baseURL = keycloakConfig.url;

export const authApi = axios.create({
  baseURL,
});

export default authApi;