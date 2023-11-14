import { constructURL, sleep, snakeCaseToSentenceCase } from "@/utils";
import axios from "axios";
import { toast } from "react-toastify";

const apiInstance = axios.create({
  baseURL: "http://localhost:8000",
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

apiInstance.interceptors.request.use(async (req) => {
  if (process.env.NODE_ENV === "development") {
    await sleep();
  }

  const access = localStorage.getItem("access");

  if (access) {
    req.headers.Authorization = `Bearer ${access}`;
  }

  return req;
});

apiInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err?.response?.data?.code === "token_not_valid") {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }

    return err;
  }
);

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

  refresh: (refresh = "", signal) => {
    const url = "/auth/refresh/";
    const data = { refresh };
    return apiInstance.post(url, data, { signal });
  },
};

const dashboard = {
  get: (signal) => {
    const url = "/dashboard";
    return apiInstance.get(url, { signal });
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

  getUsernameSuggestions: ({ firstName = "", lastName = "" }, signal) => {
    const url = "/users/username-suggestions/";
    const data = {
      first_name: firstName,
      last_name: lastName,
    };
    return apiInstance.post(url, data, { signal });
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

  changeName: ({ firstName = "", lastName = "" }) => {
    const url = "/users/me/";
    const data = { first_name: firstName, last_name: lastName };
    return apiInstance.patch(url, data);
  },

  changeEmail: ({ email = "" }) => {
    const url = "/users/me/";
    const data = { email };
    return apiInstance.patch(url, data);
  },

  changeUsername: ({ username = "" }) => {
    const url = "/users/me/";
    const data = { username };
    return apiInstance.patch(url, data);
  },

  changePassword: ({ password }) => {
    const url = "/users/me/password/";
    const data = { password };
    return apiInstance.put(url, data);
  },

  changeProfileImage: ({ profileImage }) => {
    const data = new FormData();

    data.append("profile_image", profileImage);

    const headers = { "Content-Type": "multipart/form-data" };

    const url = "/users/me/profile_image/";

    return apiInstance.put(url, data, { headers });
  },

  removeProfileImage: () => {
    const url = "/users/me/profile_image/";

    return apiInstance.delete(url);
  },
};

const auctions = {
  getAvailable: (
    {
      search = "",
      category = 0,
      minPrice = "",
      maxPrice = "",
      ordering = "",
      pageSize = 10,
      exclude = 0,
      page = 1,
    },
    signal
  ) => {
    const query = {
      search,
      category,
      min_price: minPrice,
      max_price: maxPrice,
      ordering,
      exclude,
      page_size: pageSize,
      page,
    };

    const url = constructURL("/products/", query);

    return apiInstance.get(url, { signal });
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

    const headers = { "Content-Type": "multipart/form-data" };

    const url = "/products/";

    return apiInstance.post(url, data, { headers });
  },

  getById: (id = 0, signal) => {
    const url = `/products/${id}`;
    return apiInstance.get(url, { signal });
  },

  getTopBidsById: (id = 0, signal) => {
    const url = `/products/${id}/bids`;
    return apiInstance.get(url, { signal });
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

  getMy: (
    {
      search = "",
      category = 0,
      minPrice = "",
      maxPrice = "",
      ordering = "",
      pageSize = 10,
      page = 1,
      status = "ongoing",
    },
    signal
  ) => {
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
    return apiInstance.get(url, { signal });
  },
};

const categories = {
  get: ({ search = "", pageSize = 10, page = 1 }, signal) => {
    const url = constructURL("/categories/", {
      search,
      page_size: pageSize,
      page,
    });
    if (signal) {
      return apiInstance.get(url, { signal });
    }
    return apiInstance.get(url, { signal });
  },

  getById: (id = 0, signal) => {
    const url = `/categories/${id}`;
    return apiInstance.get(url, { signal });
  },
};

const bids = {
  get: ({ page = 1, pageSize = 10, status = "ongoing" }, signal) => {
    const url = constructURL("/bids/", { page, page_size: pageSize, status });
    return apiInstance.get(url, { signal });
  },
};

const handleError = (res) => {
  const isError = !apiInstance.defaults.validateStatus(res.status);
  if (isError) throw res;
};

const getErrorMessage = (err) => {
  let message = "Something went wrong";
  const data = err?.response?.data;
  if (data) {
    const detail = data?.detail;
    if (detail) {
      message = detail;
    } else if (typeof data === "object") {
      const first = Object.entries(data)?.[0];
      if (first) {
        const [key, detail] = first;
        message = `${snakeCaseToSentenceCase(key)}: ${detail}`;
      }
    }
    return message;
  }
};

const api = {
  auctions,
  auth,
  categories,
  users,
  dashboard,
  bids,
  handleError,
  getErrorMessage,
};

export default api;
