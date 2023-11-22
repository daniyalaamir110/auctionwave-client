import { useState } from "react";
import useCategories from "./useCategories";
import useSignalEffect from "./useSignalEffect";

/**
 * This hook handles the categories from server
 * @param {boolean} fetchFirst
 * Should automatically fetch the categories initially?
 * @returns
 */
const useSearchCategories = (fetchFirst = false) => {
  const categories = useCategories();

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (signal) => {
    categories.get({ search: value, pageSize: 20 }, signal);
  };

  useSignalEffect(
    (signal) => {
      if (fetchFirst) {
        categories.get({ search: value, pageSize: 20 }, signal);
      }
    },
    [fetchFirst]
  );

  return {
    value,
    status: categories.status,
    handleChange,
    handleSubmit: () => handleSubmit(),
  };
};

export default useSearchCategories;
