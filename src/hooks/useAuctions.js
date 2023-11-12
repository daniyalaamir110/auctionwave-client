import api from "@/services/api";
import useRequestStatus from "./useRequestStatus";

const useAuctions = () => {
  const auctionsStatus = useRequestStatus();

  const getAvailable = (
    {
      search = "",
      category = "",
      minPrice = "",
      maxPrice = "",
      ordering = "",
      pageSize = 10,
      page = 1,
    },
    signal
  ) => {
    auctionsStatus.handlers.reset();
    auctionsStatus.handlers.setLoading(true);
    api.auctions
      .getAvailable(
        {
          search,
          category,
          minPrice,
          maxPrice,
          ordering,
          pageSize,
          page,
        },
        signal
      )
      .then((res) => {
        const data = res.data;
        auctionsStatus.handlers.setData(data);
      })
      .catch((err) => {
        auctionsStatus.handlers.setError("Couldn't fetch auctions");
      })
      .finally(() => {
        auctionsStatus.handlers.setLoading(false);
      });
  };

  const getMy = (
    {
      search = "",
      category = "",
      minPrice = "",
      maxPrice = "",
      ordering = "",
      pageSize = 10,
      page = 1,
      status = "ongoing",
    },
    signal
  ) => {
    auctionsStatus.handlers.reset();
    auctionsStatus.handlers.setLoading(true);
    api.auctions
      .getMy(
        {
          search,
          category,
          minPrice,
          maxPrice,
          ordering,
          pageSize,
          page,
          status,
        },
        signal
      )
      .then((res) => {
        const data = res.data;
        auctionsStatus.handlers.setData(data);
      })
      .catch((err) => {
        auctionsStatus.handlers.setError("Couldn't fetch auctions");
      })
      .finally(() => {
        auctionsStatus.handlers.setLoading(false);
      });
  };

  return {
    getAvailable,
    getMy,
    status: auctionsStatus.state,
  };
};

export default useAuctions;
