import axios from "axios";

export const api = (baseURL: string) => axios.create({
    baseURL: baseURL, 
  });
  