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

  const count = categories.status.data?.count || 0;

  const noResults =
    !categories.status.loading && !categories.status.data?.results?.length;

  return { status: categories.status, count, noResults };
};

export default useAllCategories;
