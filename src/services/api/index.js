import { constructURL, sleep } from "@/utils";
import axios from "axios";

/**
 * Create an API instance pointing at the server's
 * base URL.
 */
const apiInstance = axios.create({
  baseURL: "http://localhost:8000",
});

/**
 * Add an request interceptor to attach the access token
 * in the authorization header of each request.
 */
apiInstance.interceptors.request.use(async (request) => {
  if (process.env.NODE_ENV === "development") {
    await sleep();
  }

  const access = localStorage.getItem("access");

  if (access) {
    request.headers.Authorization = `Bearer ${access}`;
  }

  return request;
});

const auth = {
  login: ({ username = "", password = "" }) => {
    const url = "/auth/login/";
    const data = { username, password };
    return apiInstance.post(url, data);
  },

  verify: ({ token = "" }) => {
    const url = "/auth/verify/";
    const data = { token };
    return apiInstance.post(url, data);
  },

  refresh: ({ refresh = "" }) => {
    const url = "/auth/refresh/";
    const data = { refresh };
    return apiInstance.post(url, data);
  },
};

const users = {
  me: () => {
    const url = "/users/me/";
    return apiInstance.get(url);
  },

  register: ({
    firstName = "",
    lastName = "",
    email = "",
    username = "",
    password = "",
  }) => {
    const url = "/users/";
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    };
    return apiInstance.post(url, data);
  },

  getUsernameSuggestions: ({ firstName = "", lastName = "" }) => {
    const url = "/users/username-suggestions/";
    const data = {
      first_name: firstName,
      last_name: lastName,
    };
    return apiInstance.post(url, data);
  },

  getUsernameAvailability: ({ username = "" }) => {
    const url = "/users/username-availability/";
    const data = { username };
    return apiInstance.post(url, data);
  },

  getEmailAvailability: ({ email = "" }) => {
    const url = "/users/email-availability/";
    const data = { email };
    return apiInstance.post(url, data);
  },
};

const auctions = {
  getAvailable: ({
    search = "",
    category = 0,
    minPrice = "",
    maxPrice = "",
    ordering = "",
    pageSize = 10,
    page = 1,
  }) => {
    const query = {
      search,
      category,
      min_price: minPrice,
      max_price: maxPrice,
      ordering,
      page_size: pageSize,
      page,
    };
    const url = constructURL("/products/", query);
    return apiInstance.get(url);
  },

  create: ({
    title = "",
    description = "",
    category = 0,
    image = "",
    basePrice = 0,
    validTill = "",
  }) => {
    const data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("base_price", basePrice);
    data.append("category", category);
    data.append("image", image, image.name);
    data.append("valid_till", validTill);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return apiInstance.post("/products/", data, { headers });
  },

  getById: (id = 0) => {
    const url = `/products/${id}`;
    return apiInstance.get(url);
  },

  getTopBidsById: (id = 0) => {
    const url = `/products/${id}/bids`;
    return apiInstance.get(url);
  },

  placeBidById: (id = 0, bidAmount = 0) => {
    const url = "/bids/";
    const data = { product_id: id, bid_amount: bidAmount };
    return apiInstance.post(url, data);
  },

  rebidById: (bidId = 0, bidAmount = 0) => {
    const url = `/bids/${bidId}/`;
    const data = { bid_amount: bidAmount };
    return apiInstance.patch(url, data);
  },

  getMy: ({
    search = "",
    category = 0,
    minPrice = "",
    maxPrice = "",
    ordering = "",
    pageSize = 10,
    page = 1,
    status = "ongoing",
  }) => {
    const query = {
      search,
      category,
      min_price: minPrice,
      max_price: maxPrice,
      ordering,
      page_size: pageSize,
      page,
      status,
    };
    const url = constructURL("/products/my/", query);
    return apiInstance.get(url);
  },
};

const categories = {
  get: ({ search = "", pageSize = 10, page = 1 }) => {
    const url = constructURL("/categories/", {
      search,
      page_size: pageSize,
      page,
    });
    return apiInstance.get(url);
  },

  getById: (id = 0) => {
    const url = `/categories/${id}`;
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
