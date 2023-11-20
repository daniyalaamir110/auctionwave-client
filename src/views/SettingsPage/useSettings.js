import { MAX_IMAGE_FILE_SIZE } from "@/constants";
import useEmailAvailability from "@/hooks/useEmailAvailability";
import useLoadUsernames from "@/hooks/useLoadUsernames";
import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import useUsernameAvailability from "@/hooks/useUsernameAvailability";
import useAuth from "@/redux/auth/useAuth";
import api from "@/services/api";
import { isValidFileType } from "@/utils";
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
  const usernameAvailability = useUsernameAvailability();
  const [editingEmail, setEditingEmail] = useState(false);
  const emailStatus = useRequestStatus();
  const emailAvailability = useEmailAvailability();
  const [editingPassword, setEditingPassword] = useState(false);
  const passwordStatus = useRequestStatus();
  const profileImageStatus = useRequestStatus();
  const profileImageRemoveStatus = useRequestStatus();

  const loadUsernames = useLoadUsernames();

  const changeNameForm = useFormik({
    initialValues: {
      firstName: auth.state.user?.first_name,
      lastName: auth.state.user?.last_name,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().trim().required("Required"),
      lastName: Yup.string().trim().required("Required"),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      nameStatus.handlers.setLoading(true);
      api.users
        .changeName(values)
        .then((res) => {
          api.handleError(res);
          toast.success("Name updated successfully");
          setEditingName(false);
          auth.updateUser(res.data);
        })
        .catch((err) => {
          const message = api.getErrorMessage(err);
          toast.error(message);
        })
        .finally(() => {
          nameStatus.handlers.setLoading(false);
        });
    },
  });

  const changeUsernameForm = useFormik({
    initialValues: {
      username: auth.state.user?.username,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().trim().required("Required").test({
        message: "Username is already taken",
        test: usernameAvailability.test,
      }),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      usernameStatus.handlers.setLoading(true);
      api.users
        .changeUsername(values)
        .then((res) => {
          api.handleError(res);
          toast.success("Username updated successfully");
          setEditingUsername(false);
          auth.updateUser(res.data);
        })
        .catch((err) => {
          const message = api.getErrorMessage(err);
          toast.error(message);
        })
        .finally(() => {
          usernameStatus.handlers.setLoading(false);
        });
    },
  });

  const changeEmailForm = useFormik({
    initialValues: {
      email: auth.state.user?.email,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .required("Required")
        .email("Invalid email")
        .test({
          message: "Email is already taken",
          test: emailAvailability.test,
        }),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values, handlers) => {
      emailStatus.handlers.setLoading(true);
      api.users
        .changeEmail(values)
        .then((res) => {
          api.handleError(res);
          toast.success("Email updated successfully");
          setEditingEmail(false);
          auth.updateUser(res.data);
        })
        .catch((err) => {
          const message = api.getErrorMessage(err);
          toast.error(message);
        })
        .finally(() => {
          emailStatus.handlers.setLoading(false);
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
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values, handlers) => {
      passwordStatus.handlers.setLoading(true);
      api.users
        .changePassword({ password: values.password })
        .then((res) => {
          api.handleError(res);
          toast.success("Password updated successfully");
          setEditingPassword(false);
          handlers.resetForm();
        })
        .catch((err) => {
          const message = api.getErrorMessage(err);
          toast.error(message);
        })
        .finally(() => {
          passwordStatus.handlers.setLoading(false);
        });
    },
  });

  const changeProfileImageForm = useFormik({
    initialValues: {
      profileImage: null,
    },
    validationSchema: Yup.object().shape({
      profileImage: Yup.mixed()
        .required("Required")
        .test("is-valid-type", "Not a valid image type", (value) =>
          isValidFileType(value && value.name.toLowerCase(), "image")
        )
        .test(
          "is-valid-size",
          "Max allowed size is 5MB",
          (value) => value && value.size <= MAX_IMAGE_FILE_SIZE
        ),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values, handlers) => {
      profileImageStatus.handlers.setLoading(true);
      api.users
        .changeProfileImage(values)
        .then((res) => {
          api.handleError(res);
          toast.success("Profile image updated successfully");
          handlers.resetForm();
          auth.updateProfileImage(res.data.profile_image);
        })
        .catch((err) => {
          const message = api.getErrorMessage(err);
          toast.error(message);
        })
        .finally(() => {
          profileImageStatus.handlers.setLoading(false);
        });
    },
  });

  const removeProfileImage = () => {
    profileImageRemoveStatus.handlers.setLoading(true);
    api.users
      .removeProfileImage()
      .then((res) => {
        api.handleError(res);
        toast.success("Profile image removed successfully");
        auth.updateProfileImage(null);
      })
      .catch((err) => {
        const message = api.getErrorMessage(err);
        toast.error(message);
      })
      .finally(() => {
        profileImageRemoveStatus.handlers.setLoading(false);
      });
  };

  emailAvailability.useReset(changeEmailForm.values.email);
  usernameAvailability.useReset(changeUsernameForm.values.username);

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
        status: passwordStatus.state,
        defaultValue: "••••••••",
      },
      changeEmail: {
        form: changeEmailForm,
        editing: editingEmail,
        setEditing: setEditingEmail,
        status: emailStatus.state,
        defaultValue: auth.state.user?.email || "(Unset)",
        emailAvailability: emailAvailability.state,
      },
      changeName: {
        form: changeNameForm,
        editing: editingName,
        setEditing: setEditingName,
        status: nameStatus.state,
        defaultValue:
          `${auth.state.user?.first_name} ${auth.state.user?.last_name}`.trim() ||
          "(Unset)",
      },
      changeUsername: {
        form: changeUsernameForm,
        editing: editingUsername,
        setEditing: setEditingUsername,
        status: usernameStatus.state,
        defaultValue: auth.state.user?.username || "(Unset)",
        suggestions: {
          status: loadUsernames.status,
          select: selectUsername,
          isSelected: isUsername,
        },
        usernameAvailability: usernameAvailability.state,
      },
      changeProfileImage: {
        form: changeProfileImageForm,
        status: profileImageStatus.state,
      },
      removeProfileImage: {
        handler: removeProfileImage,
        status: profileImageRemoveStatus.state,
      },
    },
  };
};

export default useSettings;
