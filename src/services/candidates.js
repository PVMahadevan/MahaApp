import api from "./custom/api";
import { handleError, handleResponse } from "../utils/response";

export const uploadResume = (formData)=> api.post("/v1/bud/upload", formData).then(handleResponse).catch(handleError)
export const saveResume = (body)=> api.post("/v1/bud/save-resume", body).then(handleResponse).catch(handleError)
export const getAllResume = (body)=> api.get("/v1/bud/resume").then(handleResponse).catch(handleError)

export const getMatchingResume = (body)=> api.post("/v1/bud/matching-profiles", body).then(handleResponse).catch(handleError)
export const getResumeQuestions = (body)=> api.post("/v1/bud/profile-questions", body).then(handleResponse).catch(handleError)
