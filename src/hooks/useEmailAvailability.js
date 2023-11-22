import api from "@/services/api";
import { useEffect, useState } from "react";

const useEmailAvailability = () => {
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [emailUnique, setEmailUnique] = useState(false);

  const test = async function (value) {
    if (checkedEmail) {
      return emailUnique;
    }
    setCheckingEmail(true);
    try {
      const res = await api.users.getEmailAvailability({
        email: value,
      });
      api.handleError(res);
      const isAvailable = res.data;
      setEmailUnique(isAvailable);
      if (!isAvailable) {
        return this.createError({
          message: "Email is already taken",
        });
      }
      return this.resolve(value);
    } catch (error) {
      setEmailUnique(false);
      return this.createError({ message: "Email is already taken" });
    } finally {
      setCheckingEmail(false);
      setCheckedEmail(true);
    }
  };

  const useReset = (value) => {
    useEffect(() => {
      setCheckedEmail(false);
      setEmailUnique(false);
    }, [value]);
  };

  const skipTest = () => {
    setCheckingEmail(false);
    setCheckedEmail(true);
    setEmailUnique(true);
  };

  return {
    test,
    useReset,
    skipTest,
    state: {
      checked: checkedEmail,
      loading: checkingEmail,
      isUnique: emailUnique,
    },
  };
};

export default useEmailAvailability;
