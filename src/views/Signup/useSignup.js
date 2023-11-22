import useDebounce from "@/hooks/useDebounce";
import useEmailAvailability from "@/hooks/useEmailAvailability";
import useLoadUsernames from "@/hooks/useLoadUsernames";
import useRequestStatus from "@/hooks/useRequestStatus";
import useUsernameAvailability from "@/hooks/useUsernameAvailability";
import api from "@/services/api";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const useSignup = () => {
  // Initializing the hooks
  const navigate = useNavigate();
  const signupStatus = useRequestStatus();
  const loadUsernames = useLoadUsernames();
  const emailAvailability = useEmailAvailability();
  const usernameAvailability = useUsernameAvailability();

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
      email: Yup.string()
        .trim()
        .required("Required")
        .email("Invalid email")
        .test({
          message: "Email is already taken",
          test: emailAvailability.test,
        }),
      username: Yup.string().trim().required("Required").test({
        message: "Username is already taken",
        test: usernameAvailability.test,
      }),
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
      loadUsernames.clear();
      signupStatus.handlers.setLoading(true);
      api.users
        .register(values)
        .then((res) => {
          api.handleError(res);
          toast.success("Signed up successfully");
          helpers.resetForm();
          navigate("/auth/login");
        })
        .catch((err) => {
          const message = api.getErrorMessage(err);
          toast.error(message);
        })
        .finally(() => {
          signupStatus.handlers.setLoading(false);
        });
    },
  });

  // Fetch username suggestions if firstname and lastname are valid
  useDebounce(
    (signal) => {
      if (form.values.firstName && form.values.lastName) {
        loadUsernames.load(form.values.firstName, form.values.lastName, signal);
      } else {
        loadUsernames.clear();
      }
    },
    1000,
    [form.values.firstName, form.values.lastName]
  );

  emailAvailability.useReset(form.values.email);
  usernameAvailability.useReset(form.values.username);

  // Select username from suggestions
  const selectUsername = (username) => {
    form.setFieldValue("username", username);
    form.setFieldError("username", null);
    usernameAvailability.skipTest();
  };

  // If username is one out of the suggestions
  const isUsername = (username) => {
    return form.values.username === username;
  };

  return {
    form,
    status: signupStatus.state,
    usernameSuggestions: loadUsernames.status,
    selectUsername,
    isUsername,
    emailAvailability: emailAvailability.state,
    usernameAvailability: usernameAvailability.state,
  };
};

export default useSignup;
