import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:8000",
});

apiInstance.interceptors.request.use((request) => {
  const access = localStorage.getItem("access");

  if (access) {
    request.headers.Authorization = `Bearer ${access}`;
  }

  return request;
});

const login = ({ username = "", password = "" }) => {
  return apiInstance.post("/auth/login", { username, password });
};

const api = {
  auth: {
    login,
  },
};

export default api;
