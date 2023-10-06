import useDebounce from "@/hooks/useDebounce";
import useLoadUsernames from "@/hooks/useLoadUsernames";
import useRequestStatus from "@/hooks/useRequestStatus";
import { useFormik } from "formik";
import * as Yup from "yup";

const useSignup = () => {
  // Initializing the hooks
  const requestStatus = useRequestStatus();
  const loadUsernames = useLoadUsernames();

  // Initializing the form
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
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      requestStatus.setLoading(true);
      setTimeout(() => {
        requestStatus.setLoading(false);
      }, 2000);
    },
  });

  // Fetch username suggestions if firstname and lastname are valid
  useDebounce(
    () => {
      if (form.values.firstName && form.values.lastName) {
        loadUsernames.load(form.values.firstName, form.values.lastName);
      } else {
        loadUsernames.clear();
      }
    },
    1000,
    [form.values.firstName, form.values.lastName]
  );

  // Select username from suggestions
  const selectUsername = (username) => {
    form.setFieldValue("username", username);
    form.setFieldError("username", null);
  };

  // If username is one out of the suggestions
  const isUsername = (username) => {
    return form.values.username === username;
  };

  return { form, requestStatus, loadUsernames, selectUsername, isUsername };
};

export default useSignup;
