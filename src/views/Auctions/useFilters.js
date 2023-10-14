import { clean, constructURL } from "@/utils";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const useFilters = (category = null, minPrice = null, maxPrice = null) => {
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      category,
      minPrice,
      maxPrice,
    },
    validate: (values) => {
      const errors = {};

      const { minPrice, maxPrice } = values;

      // Check if the values are positive
      if (minPrice < 0) {
        errors.minPrice = "Must be a positive number";
      }
      if (maxPrice < 0) {
        errors.maxPrice = "Must be a positive number";
      }

      // Check if the range is valid
      if (minPrice !== null && maxPrice !== null) {
        if (minPrice > maxPrice) {
          errors.minPrice = "Must not be greater than max price";
          errors.maxPrice = "Must not be less than min price";
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      const query = clean(values);

      const url = constructURL("/app/auctions", query);

      navigate(url);
    },
  });

  return { form };
};

export default useFilters;
