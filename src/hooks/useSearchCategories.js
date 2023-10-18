import { useEffect, useState } from "react";
import useCategories from "./useCategories";

const useSearchCategories = ({ fetchFirst = false } = {}) => {
  const categories = useCategories();

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    categories.get({ search: value, pageSize: 20 });
  };

  useEffect(() => {
    if (fetchFirst) {
      handleSubmit();
    }
  }, [fetchFirst]);

  return {
    value,
    categories,
    handleChange,
    handleSubmit,
  };
};

export default useSearchCategories;
