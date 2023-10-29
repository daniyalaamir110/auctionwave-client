import api from "@/services/api";
import useRequestStatus from "./useRequestStatus";

const useAuctions = () => {
  const requestStatus = useRequestStatus();

  const getAvailable = ({
    search = "",
    category = "",
    minPrice = "",
    maxPrice = "",
    ordering = "",
    pageSize = 10,
    page = 1,
  }) => {
    requestStatus.reset();
    requestStatus.setLoading(true);
    api.auctions
      .getAvailable({
        search,
        category,
        minPrice,
        maxPrice,
        ordering,
        pageSize,
        page,
      })
      .then((res) => {
        const data = res.data;
        requestStatus.setData(data);
      })
      .catch((err) => {
        requestStatus.setError("Couldn't fetch auctions");
      })
      .finally(() => {
        requestStatus.setLoading(false);
      });
  };

  const getMy = ({
    search = "",
    category = "",
    minPrice = "",
    maxPrice = "",
    ordering = "",
    pageSize = 10,
    page = 1,
    status = "ongoing",
  }) => {
    requestStatus.reset();
    requestStatus.setLoading(true);
    api.auctions
      .getMy({
        search,
        category,
        minPrice,
        maxPrice,
        ordering,
        pageSize,
        page,
        status,
      })
      .then((res) => {
        const data = res.data;
        requestStatus.setData(data);
      })
      .catch((err) => {
        requestStatus.setError("Couldn't fetch auctions");
      })
      .finally(() => {
        requestStatus.setLoading(false);
      });
  };

  return {
    getAvailable,
    getMy,
    requestStatus,
  };
};

export default useAuctions;
