import useAuth from "@/redux/auth/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";

const useLogin = () => {
  const auth = useAuth();

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().trim().required("Required"),
      password: Yup.string().trim().required("Required"),
    }),
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      auth.login(values);
    },
  });

  return { form };
};

export default useLogin;
