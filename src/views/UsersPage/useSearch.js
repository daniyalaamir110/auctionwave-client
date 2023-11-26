import useQuery from "@/hooks/useQuery";
import { clean, constructURL } from "@/utils";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const useSearch = () => {
  const navigate = useNavigate();

  const query = useQuery();

  const search = query.get("search") || "";

  const form = useFormik({
    initialValues: { search },
    onSubmit: (values) => {
      const newQuery = clean(values);

      const url = constructURL("/app/users", newQuery);

      navigate(url);
    },
  });

  return { form };
};

export default useSearch;
