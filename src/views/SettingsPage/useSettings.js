import useRequestStatus from "@/hooks/useRequestStatus";
import useAuth from "@/redux/auth/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";

const useSettings = () => {
  const auth = useAuth();
  const status = useRequestStatus();

  console.log(auth.state);

  const generalForm = useFormik({
    initialValues: {
      firstName: auth.state.user?.first_name,
      lastName: auth.state.user?.last_name,
      username: auth.state.user?.username,
      email: auth.state.user?.email,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().optional(),
      lastName: Yup.string().optional(),
      username: Yup.string().optional(),
      email: Yup.string().optional().email(),
    }),
  });

  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return {
    forms: { general: generalForm, changePassword: changePasswordForm },
    status,
  };
};

export default useSettings;
