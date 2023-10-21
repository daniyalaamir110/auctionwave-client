import useAuctions from "@/hooks/useAuctions";
import useQuery from "@/hooks/useQuery";
import { useEffect, useState } from "react";

const useAvailableAuctions = () => {
  const auctions = useAuctions();
  const query = useQuery();

  const category = query.get("category") || "";
  const minPrice = query.get("minPrice") || "";
  const maxPrice = query.get("maxPrice") || "";
  const search = query.get("search") || "";
  const page = query.get("page") || 1;

  useEffect(() => {
    auctions.getAvailable({ search, category, minPrice, maxPrice, page });
  }, [category, minPrice, maxPrice, search, page]);

  return {
    auctions,
  };
};

export default useAvailableAuctions;
