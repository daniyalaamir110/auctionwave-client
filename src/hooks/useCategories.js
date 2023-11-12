import api from "@/services/api";
import useRequestStatus from "./useRequestStatus";

const useCategories = () => {
  const categoriesStatus = useRequestStatus();

  const get = ({ search = "", pageSize = 10, page = 1 }, signal) => {
    categoriesStatus.handlers.reset();
    categoriesStatus.handlers.setLoading(true);
    api.categories
      .get({ search, pageSize, page }, signal)
      .then((res) => {
        const data = res.data;
        categoriesStatus.handlers.setData(data);
      })
      .catch((err) => {
        console.log(err);
        categoriesStatus.handlers.setError("Couldn't fetch categories.");
      })
      .finally(() => {
        categoriesStatus.handlers.setLoading(false);
      });
  };

  return { get, status: categoriesStatus.state };
};

export default useCategories;
