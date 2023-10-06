import useRequestStatus from "@/hooks/useRequestStatus";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const useLogin = () => {
  const requestStatus = useRequestStatus();

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
      requestStatus.setLoading(true);
      setTimeout(() => {
        requestStatus.setLoading(false);
        toast("Logged in successfully", { type: "success" });
      }, 2000);
    },
  });

  return { form, requestStatus };
};

export default useLogin;
