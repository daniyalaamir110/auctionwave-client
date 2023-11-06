import api from "@/services/api";
import useRequestStatus from "./useRequestStatus";

const useCategories = () => {
  const requestStatus = useRequestStatus();

  const get = ({ search = "", pageSize = 10, page = 1 }, signal) => {
    requestStatus.reset();
    requestStatus.setLoading(true);
    api.categories
      .get({ search, pageSize, page }, signal)
      .then((res) => {
        const data = res.data;
        requestStatus.setData(data);
      })
      .catch((err) => {
        console.log(err);
        requestStatus.setError("Couldn't fetch categories.");
      })
      .finally(() => {
        requestStatus.setLoading(false);
      });
  };

  return { get, requestStatus };
};

export default useCategories;
