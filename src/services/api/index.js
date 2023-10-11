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

const auth = {
  login: ({ username = "", password = "" }) => {
    return apiInstance.post("/auth/login/", { username, password });
  },

  verify: ({ token = "" }) => {
    return apiInstance.post("/auth/verify/", { token });
  },

  refresh: ({ refresh = "" }) => {
    return apiInstance.post("/auth/refresh/", { refresh });
  },
};

const users = {
  register: ({
    firstName = "",
    lastName = "",
    email = "",
    username = "",
    password = "",
  }) => {
    return apiInstance.post("/users/", {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    });
  },

  getUsernameSuggestions: ({ firstName = "", lastName = "" }) => {
    return apiInstance.post("/users/username-suggestions/", {
      first_name: firstName,
      last_name: lastName,
    });
  },

  getUsernameAvailability: ({ username = "" }) => {
    return apiInstance.post("/users/username-availability/", { username });
  },

  getEmailAvailability: ({ email = "" }) => {
    return apiInstance.post("/users/email-availability/", { email });
  },
};

const api = {
  auth,
  users,
};

export default api;
