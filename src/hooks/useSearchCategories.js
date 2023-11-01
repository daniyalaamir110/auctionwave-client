import { useEffect, useState } from "react";
import useCategories from "./useCategories";
import useSignalEffect from "./useSignalEffect";

const useSearchCategories = ({ fetchFirst = false } = {}) => {
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
        handleSubmit(signal);
      }
    },
    [fetchFirst]
  );

  return {
    value,
    categories,
    handleChange,
    handleSubmit,
  };
};

export default useSearchCategories;
