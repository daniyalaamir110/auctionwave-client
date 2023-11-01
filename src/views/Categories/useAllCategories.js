import useCategories from "@/hooks/useCategories";
import useQuery from "@/hooks/useQuery";
import useSignalEffect from "@/hooks/useSignalEffect";

const useAllCategories = () => {
  const categories = useCategories();
  const query = useQuery();

  const page = +(query.get("page") || 1);
  const search = query.get("search") || "";

  useSignalEffect(
    (signal) => {
      categories.get({ page, pageSize: 12, search }, signal);
    },
    [page, search]
  );

  const count = categories.requestStatus.data?.count || 0;

  return { categories, count };
};

export default useAllCategories;
