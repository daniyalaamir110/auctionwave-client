import useAuctions from "@/hooks/useAuctions";
import useQuery from "@/hooks/useQuery";
import { useEffect } from "react";

const useMyAuctions = () => {
  const auctions = useAuctions();
  const query = useQuery();

  const category = query.get("category") || "";
  const minPrice = query.get("minPrice") || "";
  const maxPrice = query.get("maxPrice") || "";
  const search = query.get("search") || "";
  const page = query.get("page") || 1;
  const status = query.get("status") || "ongoing";

  useEffect(() => {
    auctions.getMy({ search, category, minPrice, maxPrice, page, status });
  }, [category, minPrice, maxPrice, search, page, status]);

  return {
    auctions,
  };
};

export default useMyAuctions;
