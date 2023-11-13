import api from "@/services/api";
import { useEffect, useState } from "react";

const useUsernameAvailability = () => {
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkedUsername, setCheckedUsername] = useState(false);
  const [usernameUnique, setUsernameUnique] = useState(false);

  const test = async function (value) {
    if (checkedUsername) {
      return usernameUnique;
    }
    setCheckingUsername(true);
    try {
      const res = await api.users.getUsernameAvailability({
        username: value,
      });
      api.handleError(res);
      const isAvailable = res.data;
      setUsernameUnique(isAvailable);
      if (!isAvailable) {
        return this.createError({
          message: "Username is already taken",
        });
      }
      return this.resolve(value);
    } catch (error) {
      setUsernameUnique(false);
      return this.createError({ message: "Username is already taken" });
    } finally {
      setCheckingUsername(false);
      setCheckedUsername(true);
    }
  };

  const useReset = (value) => {
    useEffect(() => {
      setCheckedUsername(false);
      setUsernameUnique(false);
    }, [value]);
  };

  const skipTest = () => {
    setCheckingUsername(false);
    setCheckedUsername(true);
    setUsernameUnique(true);
  };

  return {
    test,
    useReset,
    skipTest,
    state: {
      checked: checkedUsername,
      loading: checkingUsername,
      isUnique: usernameUnique,
    },
  };
};

export default useUsernameAvailability;
