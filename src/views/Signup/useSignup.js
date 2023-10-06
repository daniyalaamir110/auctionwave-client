import useDebounce from "@/hooks/useDebounce";
import useLoadUsernames from "@/hooks/useLoadUsernames";
import useRequestStatus from "@/hooks/useRequestStatus";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const emailValidationApi = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "daniyal.amir110@gmail.com") {
        reject("Email is already taken");
      } else {
        resolve();
      }
    }, 1000);
  });
};

const usernameValidationApi = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "daniyal.aamir8") {
        reject("Username is already taken");
      } else {
        resolve();
      }
    }, 1000);
  });
};

const useSignup = () => {
  // Initializing the hooks
  const requestStatus = useRequestStatus();
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
          message: "Email already taken",
          test: function (value) {
            if (checkedEmail) {
              return emailUnique;
            }
            setCheckingEmail(true);
            return emailValidationApi(value)
              .then((res) => {
                const message = res;
                console.log("API Response:", message);
                setEmailUnique(true);
                return this.resolve(value);
              })
              .catch((e) => {
                setEmailUnique(false);
                return this.createError({ message: e });
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
            return usernameValidationApi(value)
              .then(() => {
                setUsernameUnique(true);
                return this.resolve(value);
              })
              .catch((e) => {
                setUsernameUnique(false);
                return this.createError({ message: e });
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
      requestStatus.setLoading(true);
      setTimeout(() => {
        requestStatus.setLoading(false);
        toast("Signed up in successfully", { type: "success" });
        helpers.resetForm();
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
    requestStatus,
    loadUsernames,
    selectUsername,
    isUsername,
    checkedEmail,
    checkingEmail,
    checkedUsername,
    checkingUsername,
  };
};

export default useSignup;
