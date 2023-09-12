import api from "./api";
import { handleError, handleResponse } from "./response";

export const createJobDescription = (data)=> api.post("/v1/bud/job-description", data).then(handleResponse).catch(handleError)