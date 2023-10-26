import useCategories from "@/hooks/useCategories";
import useQuery from "@/hooks/useQuery";
import { useEffect } from "react";

const useAllCategories = () => {
  const categories = useCategories();
  const query = useQuery();

  const page = +(query.get("page") || 1);
  const search = query.get("search") || "";

  useEffect(() => {
    categories.get({ page, pageSize: 12, search });
  }, [page, search]);

  const count = categories.requestStatus.data?.count || 0;

  return { categories, count };
};

export default useAllCategories;
