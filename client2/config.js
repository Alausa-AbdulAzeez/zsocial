import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://zsocial.herokuapp.com/api/",
});
