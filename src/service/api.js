import axios, { InternalAxiosRequestConfig } from "axios";

// const BASE_URL = "127.0.0.1:8000/";

const api = axios.create({
  // baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
// api.interceptors.request.use((req: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

export default api;
