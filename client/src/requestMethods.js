import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const currentUser = JSON.parse(
  localStorage.getItem("persist:root")
)?.currentUser;

const TOKEN = currentUser && JSON.parse(currentUser)?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN },
});
