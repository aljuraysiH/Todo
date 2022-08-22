import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:4000/api/todo",
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});
