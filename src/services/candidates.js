import api from "./custom/api";
import { handleError, handleResponse } from "../utils/response";

export const uploadResume = (formData)=> api.post("/v1/bud/upload", formData).then(handleResponse).catch(handleError)