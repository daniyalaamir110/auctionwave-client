import useAuctions from "@/hooks/useAuctions";
import useQuery from "@/hooks/useQuery";
import useSignalEffect from "@/hooks/useSignalEffect";

const useAvailableAuctions = () => {
  const auctions = useAuctions();
  const query = useQuery();

  const category = query.get("category") || "";
  const minPrice = query.get("minPrice") || "";
  const maxPrice = query.get("maxPrice") || "";
  const search = query.get("search") || "";
  const page = query.get("page") || 1;

  useSignalEffect(
    (signal) => {
      auctions.getAvailable(
        { search, category, minPrice, maxPrice, page, pageSize: 12 },
        signal
      );
    },
    [category, minPrice, maxPrice, search, page]
  );

  const noResults =
    !auctions.status.loading && !auctions.status.data?.results?.length;

  return { status: auctions.status, noResults };
};

export default useAvailableAuctions;
