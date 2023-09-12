import api from "./custom/api";
import { handleError, handleResponse } from "../utils/response";

export const createJobDescription = (data)=> api.post("/v1/bud/job-description", data).then(handleResponse).catch(handleError)