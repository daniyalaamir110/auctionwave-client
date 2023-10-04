import useRequestStatus from "@/hooks/useRequestStatus";
import { useFormik } from "formik";
import * as Yup from "yup";

const useSignup = () => {
  const requestStatus = useRequestStatus();

  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().trim().required("Required"),
      lastName: Yup.string().trim().required("Required"),
      email: Yup.string().trim().required("Required").email("Invalid email"),
      username: Yup.string().trim().required("Required"),
      password: Yup.string()
        .trim()
        .required("Required")
        .min(8, "Password must be between 8-20 characters long")
        .max(20, "Password must be between 8-20 characters long"),
      confirmPassword: Yup.string()
        .trim()
        .required("Required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    isInitialValid: false,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      requestStatus.setLoading(true);
      setTimeout(() => {
        requestStatus.setLoading(false);
      }, 2000);
    },
  });

  return { form, requestStatus };
};

export default useSignup;
