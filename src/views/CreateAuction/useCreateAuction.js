import { MAX_FILE_SIZE } from "@/constants";
import useRequestStatus from "@/hooks/useRequestStatus";
import api from "@/services/api";
import { isValidFileType } from "@/utils";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const useCreateAuction = () => {
  // Initializing the hooks
  const requestStatus = useRequestStatus();

  // Initializing the form
  const form = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: null,
      image: null,
      basePrice: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().trim().required("Required"),
      description: Yup.string().trim().required("Required"),
      category: Yup.number()
        .required("Category is required")
        .integer()
        .positive(),
      image: Yup.mixed()
        .required("Required")
        .test("is-valid-type", "Not a valid image type", (value) =>
          isValidFileType(value && value.name.toLowerCase(), "image")
        )
        .test(
          "is-valid-size",
          "Max allowed size is 5MB",
          (value) => value && value.size <= MAX_FILE_SIZE
        ),
      basePrice: Yup.number()
        .required("Base price is required")
        .integer()
        .positive(),
    }),
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, helpers) => {
      api.auctions.create(values).then(() => {
        toast("Auction created");
      });
    },
  });

  return {
    form,
    requestStatus,
  };
};

export default useCreateAuction;
