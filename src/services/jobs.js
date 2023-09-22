import api from "./custom/api";
import { handleError, handleResponse } from "../utils/response";

export const createJobDescription = (data)=> api.post("/v1/bud/job-description", data).then(handleResponse).catch(handleError)
export const saveJobDescription = (data)=> api.post("/v1/bud/save-job-description", data).then(handleResponse).catch(handleError)
export const getJobDescriptionHistory = ()=> api.get("/v1/bud/job-description").then(handleResponse).catch(handleError)