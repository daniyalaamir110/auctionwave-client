import useQuery from "@/hooks/useQuery";
import { clean, constructURL } from "@/utils";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const useFilters = () => {
  const navigate = useNavigate();

  const query = useQuery();

  const category = query.get("category") || "";
  const minPrice = query.get("minPrice") || "";
  const maxPrice = query.get("maxPrice") || "";
  const search = query.get("search") || "";

  const form = useFormik({
    initialValues: {
      category,
      minPrice,
      maxPrice,
    },
    validate: (values) => {
      const errors = {};

      const { minPrice, maxPrice } = values;

      // Check if the values are non-negative
      if (minPrice < 0) {
        errors.minPrice = "Must be a non-negative number";
      }
      if (maxPrice < 0) {
        errors.maxPrice = "Must be a non-negative number";
      }

      // Check if the range is valid
      if (!minPrice && maxPrice !== 0) {
        if (minPrice > maxPrice) {
          errors.minPrice = "Must not be greater than max price";
          errors.maxPrice = "Must not be less than min price";
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      values.search = search;

      const newQuery = clean(values);

      const url = constructURL("/app/auctions", newQuery);

      navigate(url);
    },
  });

  return { form };
};

export default useFilters;
