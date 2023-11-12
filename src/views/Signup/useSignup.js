import useDebounce from "@/hooks/useDebounce";
import useLoadUsernames from "@/hooks/useLoadUsernames";
import useRequestStatus from "@/hooks/useRequestStatus";
import api from "@/services/api";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const useSignup = () => {
  // Initializing the hooks
  const navigate = useNavigate();
  const signupStatus = useRequestStatus();
  const loadUsernames = useLoadUsernames();
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [emailUnique, setEmailUnique] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkedUsername, setCheckedUsername] = useState(false);
  const [usernameUnique, setUsernameUnique] = useState(false);

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
          test: function (value) {
            if (checkedEmail) {
              return emailUnique;
            }
            setCheckingEmail(true);
            return api.users
              .getEmailAvailability({ email: value })
              .then((res) => {
                const isAvailable = res.data;
                setEmailUnique(isAvailable);
                if (!isAvailable) {
                  return this.createError({
                    message: "Email is already taken",
                  });
                }
                return this.resolve(value);
              })
              .catch(() => {
                setEmailUnique(false);
                return this.createError({ message: "Email is already taken" });
              })
              .finally(() => {
                setCheckingEmail(false);
                setCheckedEmail(true);
              });
          },
        }),
      username: Yup.string()
        .trim()
        .required("Required")
        .test({
          message: "Username is already taken",
          test: function (value) {
            if (checkedUsername) {
              return usernameUnique;
            }
            setCheckingUsername(true);
            return api.users
              .getUsernameAvailability({ username: value })
              .then((res) => {
                const isAvailable = res.data;
                setUsernameUnique(isAvailable);
                if (!isAvailable) {
                  return this.createError({
                    message: "Username is already taken",
                  });
                }
                return this.resolve(value);
              })
              .catch((e) => {
                setUsernameUnique(false);
                return this.createError({
                  message: "Username is already taken",
                });
              })
              .finally(() => {
                setCheckingUsername(false);
                setCheckedUsername(true);
              });
          },
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
          toast.success("Signed up successfully");
          helpers.resetForm();
          navigate("/auth/login");
        })
        .catch((err) => {
          toast.error("Couldn't sign you up");
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

  useEffect(() => {
    setCheckedEmail(false);
    setEmailUnique(false);
  }, [form.values.email]);

  useEffect(() => {
    setCheckedUsername(false);
    setUsernameUnique(false);
  }, [form.values.username]);

  // Select username from suggestions
  const selectUsername = (username) => {
    form.setFieldValue("username", username);
    form.setFieldError("username", null);
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
    checkedEmail,
    checkingEmail,
    checkedUsername,
    checkingUsername,
  };
};

export default useSignup;
