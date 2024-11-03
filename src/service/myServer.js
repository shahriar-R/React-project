import api from "./api";

export const SendData = async (data) => {
  return await api.post("/http://127.0.0.1:8000/forward/", data);
};
