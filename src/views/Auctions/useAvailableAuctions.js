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

  useEffect(() => {
    auctions.getAvailable({ search, category, minPrice, maxPrice });
  }, [category, minPrice, maxPrice, search]);

  return {
    auctions,
  };
};

export default useAvailableAuctions;
