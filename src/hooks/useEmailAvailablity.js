import { useState } from "react";
import useRequestStatus from "./useRequestStatus";

const useEmailAvailability = () => {
  const requestStatus = useRequestStatus();

  const check = (email) => {
    requestStatus.setLoading(true);
    setTimeout(() => {
      requestStatus.setLoading(false);
      requestStatus.setData({
        isAvailable: email !== "daniyal.amir110@gmail.com",
      });
    }, 2000);
  };

  const clear = requestStatus.reset;

  return { requestStatus, check, clear };
};

export default useEmailAvailability;
