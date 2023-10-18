import { constructURL } from "@/utils";
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

const auctions = {
  create: ({
    title = "",
    description = "",
    category = 0,
    image = "",
    basePrice = 0,
    validTill = "",
  }) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("base_price", basePrice);
    formData.append("category", category);
    formData.append("image", image, image.name);
    formData.append("valid_till", validTill);

    return apiInstance.post("/products/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

const categories = {
  get: ({ search = "", pageSize = 10, page = 1 }) => {
    const url = constructURL("/categories/", { search, pageSize, page });
    return apiInstance.get(url);
  },
};

const api = {
  auctions,
  auth,
  categories,
  users,
};

export default api;
