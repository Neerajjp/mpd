import axios from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../config";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../utils/axios";


export const projectList = async () => {
    try{
        const res = await apiGet(`${apiBaseUrl}/projects/`)
        if (res.status < 299) {
            return res.data;
        } else {

            return null;
        }
    }
    catch(err){
        return []
        // if(err?.response?.status === 401 ) return toast.error('Invalid email and password')
        //  return toast.error('Something went wrong')
    }
 
}


export const createProject = async (data) => {
    try{
        const res = await apiPost(`${apiBaseUrl}/projects/`, data);
        if (res.status < 299) {
            return res.data;
        } else {

            return null;
        }
    }
    catch(err){
        return []
        // if(err?.response?.status === 401 ) return toast.error('Invalid email and password')
        //  return toast.error('Something went wrong')
    }
 
}

export const projectDetails = async (id) => {
  try{
      const res = await apiGet(`${apiBaseUrl}/projects/${id}/`)
      if (res.status < 299) {
          return res.data;
      } else {

          return null;
      }
  }
  catch(err){
      return null

      //  return toast.error('Something went wrong')
  }
}; 


export const projectDelete = async (id) => {
  try{
      const res = await apiDelete(`${apiBaseUrl}/projects/${id}/`);
      if (res.status < 299) {
          return res.data;
      } else {

          return null;
      }
  }
  catch(err){
      return null

      //  return toast.error('Something went wrong')
  }
}; 


export const projectUpdate = async (id, payload, setIsLoading) => {
  try{
    setIsLoading(true)
      const res = await apiPatch(`${apiBaseUrl}/projects/${id}/`, payload)
      setIsLoading(false)
      if (res.status < 299) {
          return res.data;
      } else {

          return null;
      }
  }
  catch(err){
    setIsLoading(false)

      return null

      //  return toast.error('Something went wrong')
  }
}; 