import useQuery from "@/hooks/useQuery";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";

const useMyAuctions = () => {
  const auctionsStatus = useRequestStatus();
  const query = useQuery();

  const category = query.get("category") || "";
  const minPrice = query.get("minPrice") || "";
  const maxPrice = query.get("maxPrice") || "";
  const search = query.get("search") || "";
  const page = query.get("page") || 1;
  const status = query.get("status") || "ongoing";

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
        api.handleError(res);
        const data = res.data;
        auctionsStatus.handlers.setData(data);
        auctionsStatus.handlers.setLoading(false);
      })
      .catch((err) => {
        if (!api.isAborted(err)) {
          const message = api.getErrorMessage(err);
          auctionsStatus.handlers.setError(message);
          auctionsStatus.handlers.setLoading(false);
        }
      });
  };

  useSignalEffect(
    (signal) => {
      getMy({ search, category, minPrice, maxPrice, page, status }, signal);
    },
    [category, minPrice, maxPrice, search, page, status]
  );

  const noResults =
    !auctionsStatus.state.loading &&
    !auctionsStatus.state.data?.results?.length;

  return { status: auctionsStatus.state, noResults };
};

export default useMyAuctions;
