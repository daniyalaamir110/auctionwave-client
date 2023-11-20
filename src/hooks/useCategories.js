import api from "@/services/api";
import useRequestStatus from "./useRequestStatus";
import { toast } from "react-toastify";

const useCategories = () => {
  const categoriesStatus = useRequestStatus();

  const get = ({ search = "", pageSize = 10, page = 1 }, signal) => {
    categoriesStatus.handlers.reset();
    categoriesStatus.handlers.setLoading(true);
    api.categories
      .get({ search, pageSize, page }, signal)
      .then((res) => {
        api.handleError(res);
        const data = res.data;
        categoriesStatus.handlers.setData(data);
        categoriesStatus.handlers.setLoading(false);
      })
      .catch((err) => {
        if (!api.isAborted(err)) {
          const message = api.getErrorMessage(err);
          categoriesStatus.handlers.setError(message);
          categoriesStatus.handlers.setLoading(false);
          toast.error(message);
        }
      });
  };

  return { get, status: categoriesStatus.state };
};

export default useCategories;
