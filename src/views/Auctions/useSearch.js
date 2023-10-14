import useQuery from "@/hooks/useQuery";
import { clean, constructURL } from "@/utils";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const useSearch = () => {
  const navigate = useNavigate();

  const query = useQuery();

  const category = query.get("category") || "";
  const minPrice = query.get("minPrice") || "";
  const maxPrice = query.get("maxPrice") || "";
  const search = query.get("search") || "";

  const form = useFormik({
    initialValues: { search },
    onSubmit: (values) => {
      values.category = category;
      values.minPrice = minPrice;
      values.maxPrice = maxPrice;

      const newQuery = clean(values);

      const url = constructURL("/app/auctions", newQuery);

      navigate(url);
    },
  });

  return { form };
};

export default useSearch;
