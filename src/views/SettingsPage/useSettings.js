import useLoadUsernames from "@/hooks/useLoadUsernames";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import useAuth from "@/redux/auth/useAuth";
import api from "@/services/api";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const useSettings = () => {
  const auth = useAuth();

  const [editingName, setEditingName] = useState(false);
  const nameStatus = useRequestStatus();
  const [editingUsername, setEditingUsername] = useState(false);
  const usernameStatus = useRequestStatus();
  const [editingEmail, setEditingEmail] = useState(false);
  const emailStatus = useRequestStatus();
  const [editingPassword, setEditingPassword] = useState(false);
  const passwordStatus = useRequestStatus();

  const loadUsernames = useLoadUsernames();

  const changeNameForm = useFormik({
    initialValues: {
      firstName: auth.state.user?.first_name,
      lastName: auth.state.user?.last_name,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().optional(),
      lastName: Yup.string().optional(),
    }),
    onSubmit: (values, handlers) => {
      nameStatus.setLoading(true);
      api.users
        .changeName(values)
        .then((res) => {
          toast.success("Name updated successfully");
          setEditingName(false);
          auth.updateUser(res.data);
        })
        .catch((err) => {
          toast.error("Error updating name");
        })
        .finally(() => {
          nameStatus.setLoading(false);
        });
    },
  });

  const changeUsernameForm = useFormik({
    initialValues: {
      username: auth.state.user?.username,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().optional(),
    }),
    onSubmit: (values, handlers) => {
      usernameStatus.setLoading(true);
      api.users
        .changeUsername(values)
        .then((res) => {
          toast.success("Username updated successfully");
          setEditingUsername(false);
          auth.updateUser(res.data);
        })
        .catch((err) => {
          toast.error("Error updating username");
        })
        .finally(() => {
          usernameStatus.setLoading(false);
        });
    },
  });

  const changeEmailForm = useFormik({
    initialValues: {
      email: auth.state.user?.email,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().optional().email(),
    }),
    onSubmit: (values, handlers) => {
      emailStatus.setLoading(true);
      api.users
        .changeEmail(values)
        .then((res) => {
          toast.success("Email updated successfully");
          setEditingEmail(false);
          auth.updateUser(res.data);
        })
        .catch((err) => {
          toast.error("Error updating email");
        })
        .finally(() => {
          emailStatus.setLoading(false);
        });
    },
  });

  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
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
    onSubmit: (values, handlers) => {
      passwordStatus.setLoading(true);
      api.users
        .changePassword({ password: values.password })
        .then((res) => {
          toast.success("Password updated successfully");
          setEditingPassword(false);
          handlers.resetForm();
        })
        .catch((err) => {
          toast.error("Error updating password");
        })
        .finally(() => {
          passwordStatus.setLoading(false);
        });
    },
  });

  useSignalEffect(
    (signal) => {
      loadUsernames.load(
        auth.state.user?.first_name,
        auth.state.user?.last_name,
        signal
      );
    },
    [auth.state.user?.first_name, auth.state.user?.last_name]
  );

  // Select username from suggestions
  const selectUsername = (username) => {
    changeUsernameForm.setFieldValue("username", username);
    changeUsernameForm.setFieldError("username", null);
  };

  // If username is one out of the suggestions
  const isUsername = (username) => {
    return changeUsernameForm.values.username === username;
  };

  return {
    forms: {
      changePassword: {
        form: changePasswordForm,
        editing: editingPassword,
        setEditing: setEditingPassword,
        status: passwordStatus,
        defaultValue: "••••••••",
      },
      changeEmail: {
        form: changeEmailForm,
        editing: editingEmail,
        setEditing: setEditingEmail,
        status: emailStatus,
        defaultValue: auth.state.user?.email || "(Unset)",
      },
      changeName: {
        form: changeNameForm,
        editing: editingName,
        setEditing: setEditingName,
        status: nameStatus,
        defaultValue:
          `${auth.state.user?.first_name} ${auth.state.user?.last_name}`.trim() ||
          "(Unset)",
      },
      changeUsername: {
        form: changeUsernameForm,
        editing: editingUsername,
        setEditing: setEditingUsername,
        status: usernameStatus,
        defaultValue: auth.state.user?.username || "(Unset)",
        suggestions: {
          loading: loadUsernames.requestStatus.loading,
          error: loadUsernames.requestStatus.error,
          data: loadUsernames.requestStatus.data,
          select: selectUsername,
          isSelected: isUsername,
        },
      },
    },
  };
};

export default useSettings;
