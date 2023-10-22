import { MAX_FILE_SIZE } from "@/constants";
import useRequestStatus from "@/hooks/useRequestStatus";
import api from "@/services/api";
import { isValidFileType } from "@/utils";
import { useFormik } from "formik";
import moment from "moment";
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
      validTillDate: moment(new Date()).format("YYYY-MM-DD"),
      validTillTime: moment(new Date()).format("HH:mm"),
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().trim().required("Required"),
      description: Yup.string().trim().required("Required"),
      category: Yup.object().required("Category is required"),
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
      validTillDate: Yup.date()
        .required()
        .min(
          moment(new Date()).format("YYYY-MM-DD"),
          "Must not be a date from past"
        ),
      validTillTime: Yup.string()
        .required()
        .when("validTillDate", ([validTillDate], schema) => {
          return validTillDate
            ? schema.test({
                message: "Combined date and time must be in the future",
                test: function (time) {
                  const date = moment(validTillDate).format("YYYY-MM-DD");
                  const combinedDateTime = moment(
                    `${date} ${time}`,
                    "YYYY-MM-DD HH:mm"
                  );

                  return combinedDateTime.isAfter(moment());
                },
              })
            : schema;
        }),
    }),
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      const { validTillDate, validTillTime } = values;
      const combinedDateTime = moment(
        `${validTillDate} ${validTillTime}`,
        "YYYY-MM-DD HH:mm"
      );
      const validTill = combinedDateTime.toISOString().slice(0, -1);
      values.validTill = validTill;
      requestStatus.reset();
      requestStatus.setLoading(true);
      api.auctions
        .create({ ...values, category: values.category.id })
        .then(() => {
          toast.success("Auction created");
        })
        .catch(() => {
          toast.error("Auction couldn't be created");
        })
        .finally(() => {
          requestStatus.setLoading(false);
        });
    },
  });

  return {
    form,
    requestStatus,
  };
};

export default useCreateAuction;
